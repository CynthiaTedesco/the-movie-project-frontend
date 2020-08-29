import {
  calculateAge,
  getBudgetsGroups,
  getLengthsGroups,
  getSimpleResults,
  getPeopleResults,
  getListResults,
  getSpecialPlainResults,
  getWordCountResults,
  getReleaseMonthResults,
  getPosterResults,
} from "@/assets/js/helpers.js";

export const state = () => ({
  movies: [],
  allGroups: {},
  randomMovies: null,
  isMobile: false,
  isTablet: false,
  winners: {},
  simulation: null,
});
export const mutations = {
  setSimulation(state, simulation) {
    //TODO decide if its needed
    state.simulation = simulation;
  },
  addGroups(state, groups) {
    state.allGroups[groups[0]] = groups[1];
    // console.log(
    //   `groups list added! Current: ${JSON.stringify(
    //     Object.keys(state.allGroups)
    //   )}`
    // );
  },
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
  setIsTablet(state, isTablet) {
    state.isTablet = isTablet;
  },
  setIsMobile(state, isMobile) {
    state.isMobile = isMobile;
  },
};
export const actions = {
  setResults(vuexContext) {
    const movies = vuexContext.getters.movies();

    const universeResults = getSimpleResults(movies, "universe");
    vuexContext.commit("addGroups", universeResults.groups);
    vuexContext.commit("addWinner", universeResults.winner);

    vuexContext.dispatch("checkGenres").then(() => {
      const genreResults = getListResults(movies, "genres", "genre_name");
      vuexContext.commit("addGroups", genreResults.groups);
      vuexContext.commit("addWinner", genreResults.winner);
    });

    const originResults = getSimpleResults(movies, "story_origin");
    vuexContext.commit("addGroups", originResults.groups);
    vuexContext.commit("addWinner", originResults.winner);

    const serieResults = getSimpleResults(movies, "serie");
    vuexContext.commit("addGroups", serieResults.groups);
    vuexContext.commit("addWinner", serieResults.winner);

    const distributionCompanyResults = getSimpleResults(
      movies,
      "distribution_company"
    );
    vuexContext.commit("addGroups", distributionCompanyResults.groups);
    vuexContext.commit("addWinner", distributionCompanyResults.winner);

    const cinematographyResults = getSimpleResults(movies, "cinematography");
    vuexContext.commit("addGroups", cinematographyResults.groups);
    vuexContext.commit("addWinner", cinematographyResults.winner);

    vuexContext.dispatch("checkLanguages").then(() => {
      const languagesResults = getListResults(
        movies,
        "languages",
        "language_name"
      );
      vuexContext.commit("addGroups", languagesResults.groups);
      vuexContext.commit("addWinner", languagesResults.winner);
    });

    vuexContext.dispatch("checkProducers").then(() => {
      const producerResults = getListResults(movies, "producers", "country");
      vuexContext.commit("addGroups", producerResults.groups);
      vuexContext.commit("addWinner", producerResults.winner);
    });

    vuexContext.dispatch("checkRestrictions").then(() => {
      const restrictionResults = getListResults(
        movies,
        "restrictions",
        "restriction_name"
      );
      vuexContext.commit("addGroups", restrictionResults.groups);
      vuexContext.commit("addWinner", restrictionResults.winner);
    });

    vuexContext.dispatch("checkCharacters").then(() => {
      const charactersResults = getPeopleResults(movies, "characters", "main");
      vuexContext.commit("addGroups", charactersResults.age.groups);
      vuexContext.commit("addWinner", charactersResults.age.winner);
      vuexContext.commit("addGroups", charactersResults.gender.groups);
      vuexContext.commit("addWinner", charactersResults.gender.winner);
    });

    vuexContext.dispatch("checkDirectors").then(() => {
      const directorsResults = getPeopleResults(movies, "directors");
      vuexContext.commit("addGroups", directorsResults.age.groups);
      vuexContext.commit("addWinner", directorsResults.age.winner);
      vuexContext.commit("addGroups", directorsResults.gender.groups);
      vuexContext.commit("addWinner", directorsResults.gender.winner);
    });

    const budgetResults = getSpecialPlainResults(
      movies,
      "budget",
      getBudgetsGroups
    );
    vuexContext.commit("addGroups", budgetResults.groups);
    vuexContext.commit("addWinner", budgetResults.winner);

    const lengthResults = getSpecialPlainResults(
      movies,
      "length",
      getLengthsGroups
    );
    vuexContext.commit("addGroups", lengthResults.groups);
    vuexContext.commit("addWinner", lengthResults.winner);

    const wordCountshResults = getWordCountResults(movies);
    vuexContext.commit("addGroups", wordCountshResults.groups);
    vuexContext.commit("addWinner", wordCountshResults.winner);

    const releaseMonthResults = getReleaseMonthResults(movies);
    vuexContext.commit("addGroups", releaseMonthResults.groups);
    vuexContext.commit("addWinner", releaseMonthResults.winner);

    const posterResults = getPosterResults(movies);
    vuexContext.commit("addGroups", posterResults.groups);
    vuexContext.commit("addWinner", posterResults.winner);
  },
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

        const indexesArray = Array.from(Array(moviesWithPoster.length).keys());
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
  checkRestrictions(vuexContext) {
    console.log("checking restrictions!");
    const associations = this.$axios.get("/movies-restrictions");
    const restrictions = this.$axios.get("/restrictions");

    return Promise.all([associations, restrictions]).then((results) => {
      return vuexContext.dispatch("updateMoviesWithRestrictions", results);
    });
  },
  checkProducers(vuexContext) {
    console.log("checking producers!");
    const associations = this.$axios.get("/movies-producers");
    const producers = this.$axios.get("/producers");

    return Promise.all([associations, producers]).then((results) => {
      return vuexContext.dispatch("updateMoviesWithProducers", results);
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
            language_name: languages.find((g) => g.id == a2.language_id).name,
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
  updateMoviesWithRestrictions(vuexContext, params) {
    const restrictions = params[1].data;
    const associations = params[0].data;

    const updatedMovies = vuexContext.getters.movies().map((movie) => {
      movie.restrictions = associations
        .filter((a) => a.movie_id == movie.id)
        .map((a2) => {
          return {
            restriction_id: a2.restriction_id,
            primary: a2.primary,
            restriction_name: restrictions.find(
              (g) => g.id == a2.restriction_id
            ).name,
          };
        });
      return movie;
    });
    vuexContext.commit("setMovies", updatedMovies);
  },
  updateMoviesWithProducers(vuexContext, params) {
    const producers = params[1].data;
    const associations = params[0].data;

    const updatedMovies = vuexContext.getters.movies().map((movie) => {
      movie.producers = associations
        .filter((a) => a.movie_id == movie.id)
        .map((a2) => {
          const toReturn = {
            producer_id: a2.producer_id,
            primary: a2.primary,
          };
          const producer = producers.find((g) => g.id == a2.producer_id);
          if (producer) {
            toReturn.name = producer.name;
            toReturn.country = producer.country;
          }

          return toReturn;
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
  setIsTablet(vuexContext, isTablet) {
    vuexContext.commit("setIsTablet", isTablet);
  },
};
export const getters = {
  simulation(state) {
    return state.simulation;
  },
  allGroups(state) {
    return state.allGroups;
  },
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
  onTablet(state) {
    return state.isTablet;
  },
  winners(state) {
    return state.winners;
  },
};
