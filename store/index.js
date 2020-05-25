import { calculateAge } from "@/assets/js/helpers.js";
import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      movies: [],
      randomMovies: null,
      isMobile: false,
      winners: {},
    },
    mutations: {
      setMovies(state, movies) {
        state.movies = movies;
      },
      addWinner(state, winner) {
        state.winners[winner[0]] = winner[1];
      },
      setRandomMovies(state, movies) {
        state.randomMovies = movies;
        console.log("random movies", movies.length);
      },
      setIsMobile(state, isMobile) {
        state.isMobile = isMobile;
      },
    },
    actions: {
      addWinner(vuexContext, winner) {
        vuexContext.commit("addWinner", winner);
      },
      checkMovies(vuexContext) {
        if (vuexContext.getters.movies().length === 0) {
          console.log("checking movies!!");
          return this.$axios.$get("/movies").then((allTheMovies) => {
            const movies = allTheMovies
              .filter((m) => m.valid)
              .sort((a, b) => b.revenue - a.revenue);
            const moviesToCommit = movies.slice(
              0,
              50
              //   vuexContext.getters.onMobile ? 20 : 50
            );

            vuexContext.commit("setMovies", moviesToCommit);

            // choose random movies
            // TODO remove when data is sanitized
            const moviesWithPoster = allTheMovies.filter((m) => m.poster);

            const indexesArray = Array.from(
              Array(moviesWithPoster.length).keys()
            );
            const index1 = Math.floor(
              Math.random() * Math.floor(indexesArray.length)
            );
            delete indexesArray[index1];
            const index2 = Math.floor(
              Math.random() * Math.floor(indexesArray.length)
            );
            delete indexesArray[index2];
            const index3 = Math.floor(
              Math.random() * Math.floor(indexesArray.length)
            );

            const randomMovies = [
              moviesWithPoster[index1],
              moviesWithPoster[index2],
              moviesWithPoster[index3],
            ];
            vuexContext.commit("setRandomMovies", randomMovies);
            return { movies: moviesToCommit, randomMovies };
          });
        }
      },
      checkGenres(vuexContext) {
        console.log("checking genres!");
        const associations = this.$axios.get("/movies-genres");
        const genres = this.$axios.get("/genres");

        return Promise.all([associations, genres]).then((results) => {
          return vuexContext.dispatch("updateMoviesWithGenres", results);
        });
      },
      checkLanguages(vuexContext) {
        console.log("checking languages!");
        const associations = this.$axios.get("/movies-languages");
        const languages = this.$axios.get("/languages");

        return Promise.all([associations, languages]).then((results) => {
          return vuexContext.dispatch("updateMoviesWithLanguages", results);
        });
      },
      checkDirectors(vuexContext) {
        console.log("checking directors!");
        const associations = this.$axios.get("/movies-directors");
        const directors = this.$axios.get("/directors");

        return Promise.all([associations, directors]).then((results) => {
          return vuexContext.dispatch("updateMoviesWithDirectors", results);
        });
      },
      checkCharacters(vuexContext) {
        console.log("checking characters!");
        const associations = this.$axios.get("/movies-characters");
        const characters = this.$axios.get("/characters");

        return Promise.all([associations, characters]).then((results) => {
          return vuexContext.dispatch("updateMoviesWithCharacters", results);
        });
      },
      updateMoviesWithLanguages(vuexContext, params) {
        const languages = params[1].data;
        const associations = params[0].data;

        const updatedMovies = vuexContext.getters.movies().map((movie) => {
          movie.languages = associations
            .filter((a) => a.movie_id == movie.id)
            .map((a2) => {
              return {
                language_id: a2.language_id,
                primary: a2.primary,
                language_name: languages.find((g) => g.id == a2.language_id)
                  .name,
              };
            });
          return movie;
        });
        vuexContext.commit("setMovies", updatedMovies);
      },
      updateMoviesWithDirectors(vuexContext, params) {
        const directors = params[1].data;
        const associations = params[0].data;

        const updatedMovies = vuexContext.getters.movies().map((movie) => {
          movie.directors = associations
            .filter((a) => a.movie_id == movie.id)
            .map((a2) => {
              const toReturn = {
                person_id: a2.person_id,
                primary: a2.primary,
              };
              const person = directors.find((g) => g.id == a2.person_id);
              if (person) {
                (toReturn.name = person.name),
                  (toReturn.gender = person.gender),
                  (toReturn.birthdate = person.date_of_birth),
                  (toReturn.age = calculateAge(
                    person.date_of_birth,
                    movie.release_date
                  ));
              }

              return toReturn;
            });
          return movie;
        });
        vuexContext.commit("setMovies", updatedMovies);
      },
      updateMoviesWithCharacters(vuexContext, params) {
        const characters = params[1].data;
        const associations = params[0].data;

        const updatedMovies = vuexContext.getters.movies().map((movie) => {
          movie.characters = associations
            .filter((a) => a.movie_id == movie.id)
            .map((a2) => {
              const toReturn = {
                person_id: a2.person_id,
                main: a2.main,
              };
              const person = characters.find((g) => g.id == a2.person_id);
              if (person) {
                (toReturn.name = person.name),
                  (toReturn.gender = person.gender),
                  (toReturn.birthdate = person.date_of_birth),
                  (toReturn.age = calculateAge(
                    person.date_of_birth,
                    movie.release_date
                  ));
              }

              return toReturn;
            });
          return movie;
        });
        vuexContext.commit("setMovies", updatedMovies);
      },
      updateMoviesWithGenres(vuexContext, params) {
        const genres = params[1].data;
        const associations = params[0].data;

        const updatedMovies = vuexContext.getters.movies().map((movie) => {
          movie.genres = associations
            .filter((a) => a.movie_id == movie.id)
            .map((a2) => {
              return {
                genre_id: a2.genre_id,
                primary: a2.primary,
                genre_name: genres.find((g) => g.id == a2.genre_id).name,
              };
            });
          return movie;
        });
        vuexContext.commit("setMovies", updatedMovies);
      },
      //TODO update movies with it!!
      // return { associations: results[0].data, genres: results[1].data }
      setIsMobile(vuexContext, isMobile) {
        vuexContext.commit("setIsMobile", isMobile);
      },
    },
    getters: {
      movies(state) {
        return (limit) => {
          if (limit) {
            return state.movies.slice(0, limit);
          } else {
            return state.movies;
          }
        };
      },
      randomMovie(state) {
        //TODO remove when data is sanitized
        const moviesWithPoster = state.movies.filter((m) => m.poster);
        const randomIndex = Math.floor(
          Math.random() * Math.floor(moviesWithPoster.length)
        );

        return moviesWithPoster[randomIndex];
      },
      randomMovies(state) {
        return state.randomMovies;
      },
      onMobile(state) {
        return state.isMobile;
      },
      winners(state) {
        return state.winners;
      },
    },
  });
};

export default createStore;
