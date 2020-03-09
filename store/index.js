import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      movies: [],
      randomMovies: null,
      isMobile: false
    },
    mutations: {
      setMovies(state, movies) {
        state.movies = movies
      },
      setRandomMovies(state, movies) {
        state.randomMovies = movies
        console.log('random movies', movies.length)
      },
      setIsMobile(state, isMobile) {
        state.isMobile = isMobile
      }
    },
    actions: {
      checkMovies(vuexContext) {
        if (vuexContext.getters.movies.length === 0) {
          console.log('checking movies!!')
          return this.$axios.$get('/movies').then(allTheMovies => {
            const movies = allTheMovies
              .filter(m => m.valid)
              .sort((a, b) => b.revenue - a.revenue)
            const moviesToCommit = movies.slice(
              0,
              50
              //   vuexContext.getters.onMobile ? 20 : 50
            )

            vuexContext.commit('setMovies', moviesToCommit)

            // choose random movies
            // TODO remove when data is sanitized
            const moviesWithPoster = allTheMovies.filter(m => m.poster)

            const indexesArray = Array.from(
              Array(moviesWithPoster.length).keys()
            )
            const index1 = Math.floor(
              Math.random() * Math.floor(indexesArray.length)
            )
            delete indexesArray[index1]
            const index2 = Math.floor(
              Math.random() * Math.floor(indexesArray.length)
            )
            delete indexesArray[index2]
            const index3 = Math.floor(
              Math.random() * Math.floor(indexesArray.length)
            )

            const randomMovies = [
              moviesWithPoster[index1],
              moviesWithPoster[index2],
              moviesWithPoster[index3]
            ]
            vuexContext.commit('setRandomMovies', randomMovies)
            return { movies: moviesToCommit, randomMovies }
          })
        }
      },
      checkGenres(vuexContext) {
        console.log('checking genres!')
        const associations = this.$axios.get('/movie-genres')
        const genres = this.$axios.get('/genres')

        return Promise.all([associations, genres]).then(results => {
          return vuexContext.dispatch('updateMoviesWithGenres', results)
        })
      },
      updateMoviesWithGenres(vuexContext, params) {
        const genres = params[1].data
        const associations = params[0].data

        const updatedMovies = vuexContext.getters.movies.map(movie => {
          movie.genres = associations
            .filter(a => a.movie_id == movie.id)
            .map(a2 => {
              return {
                genre_id: a2.genre_id,
                primary: a2.primary,
                genre_name: genres
                  .find(g => g.id == a2.genre_id).name
              }
            })
          debugger
          return movie
        })
        debugger
        vuexContext.commit('setMovies', updatedMovies)
      },
      //TODO update movies with it!!
      // return { associations: results[0].data, genres: results[1].data }
      setIsMobile(vuexContext, isMobile) {
        vuexContext.commit('setIsMobile', isMobile)
      }
    },
    getters: {
      movies(state) {
        return state.movies
      },
      randomMovie(state) {
        //TODO remove when data is sanitized
        const moviesWithPoster = state.movies.filter(m => m.poster)
        const randomIndex = Math.floor(
          Math.random() * Math.floor(moviesWithPoster.length)
        )

        return moviesWithPoster[randomIndex]
      },
      randomMovies(state) {
        return state.randomMovies
      },
      onMobile(state) {
        return state.isMobile
      }
    }
  })
}

export default createStore
