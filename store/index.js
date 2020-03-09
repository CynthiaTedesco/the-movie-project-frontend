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

          const indexesArray = Array.from(Array(moviesWithPoster.length).keys())
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
      },
      setMovies(vuexContext, movies) {
        vuexContext.commit('setMovies', movies)
      },
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
