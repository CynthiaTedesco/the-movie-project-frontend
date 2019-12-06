import Vuex from 'vuex';
const fs = require('fs');

const createStore = () => {
  return new Vuex.Store({
    state: {
      movies: [],
      isMobile: false
    },
    mutations: {
      setMovies(state, movies) {
        state.movies = movies;
      },
      setIsMobile(state, isMobile) {
        state.isMobile = isMobile;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        const moviesFileContent = fs.readFileSync('./assets/movies.json');
        
        const allTheMovies = JSON
          .parse(moviesFileContent)
          .sort((a, b) => a.revenue - b.revenue);
        
        vuexContext.commit(
          'setMovies',
          allTheMovies.slice(0, context.store.getters.onMobile ? 20 : 50)
        );
      },
      setMovies(vuexContext, movies) {
        vuexContext.commit('setMovies', movies);
      },
      setIsMobile(vuexContext, isMobile) {
        vuexContext.commit('setIsMobile', isMobile);
      }
    },
    getters: {
      movies(state) {
        return state.movies;
      },
      randomMovie(state) {
        const randomIndex = Math.floor(
          Math.random() * Math.floor(state.movies.length)
        );

        return state.movies[randomIndex];
      },
      onMobile(state) {
        return state.isMobile;
      }
    }
  });
};

export default createStore;
