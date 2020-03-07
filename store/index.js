import Vuex from 'vuex'
import axios from 'axios'
const fs = require('fs')

const createStore = () => {
  return new Vuex.Store({
    state: {
      movies: [],
      isMobile: false
    },
    mutations: {
      setMovies(state, movies) {
        state.movies = movies
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
        this.$axios.$get('/movies').then(allTheMovies => {
          vuexContext.commit(
            'setMovies',
            allTheMovies.slice(0, vuexContext.getters.onMobile ? 20 : 50)
          )
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
      onMobile(state) {
        return state.isMobile
      }
    }
  })
}

export default createStore
