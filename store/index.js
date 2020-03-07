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
      // nuxtServerInit(vuexContext, context) {
      //   console.log('nuxtServerInit')
      //   axios
      //     .get('http://localhost:3001/api/movies')
      //     .then(results => {
      //       const allTheMovies = results
      //       vuexContext.commit(
      //         'setMovies',
      //         allTheMovies.slice(0, context.store.getters.onMobile ? 20 : 50)
      //       )
      //     })
      //     .catch(error => {
      //       console.log('there was a problem!!', error)
      //     })
      // },
      checkMovies(vuexContext) {
        console.log('checking movies!!')
        return this.$axios.$get('/movies').then(allTheMovies => {
          const promise1 = vuexContext.commit(
            'setMovies',
            allTheMovies.slice(0, vuexContext.getters.onMobile ? 20 : 50)
          )

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
          // console.log('about to set randomMovies', randomMovies.length);
          const promise2 = vuexContext.commit('setRandomMovies', randomMovies)
          return Promise.all([promise1, promise2])
        })
        // FS does not work in client side
        // const moviesFileContent = fs.readFileSync('./assets/movies.json')

        // const allTheMovies = JSON.parse(moviesFileContent).sort(
        //   (a, b) => a.revenue - b.revenue
        // )

        // vuexContext.commit(
        //   'setMovies',
        //   allTheMovies.slice(0, context.store.getters.onMobile ? 20 : 50)
        // )
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
