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
import Vue from "vue";

const QUANTITY = 30;

export const state = () => ({
  movies: [],
  allGroups: {},
  randomMovies: null,
  isMobile: false,
  isTablet: false,
  winners: {},
  simulation: null,
  max: 0,
});
export const mutations = {
  setAxisGroup(state, { groups, attr_name, singleKeyword }) {
    groups.map(([name, movies]) => {

      movies.map((m) => {
        m.axisGroups = m.axisGroups || {};

        let tooltip = "";
        if (singleKeyword === "age") {
          const lead = m[attr_name].find((a) => a.main || a.primary);
          tooltip = lead ? `${lead.name} (${lead.age})` : "";
        } else {
          switch (attr_name) {
            case "budget": {
              tooltip = beautifyCashValue(m[attr_name]);
              break;
            }
            case "length": {
              tooltip = `${m[attr_name]}min`;
              break;
            }
            case "word_count": {
              tooltip = `${m[attr_name]} words in ${m.length}min`;
              break;
            }
          }
        }

        m.axisGroups[attr_name] = {
          name,
          tooltip,
        };

        return m;
      });
    });
    const newMovies = [].concat.apply(
      [],
      groups.map((g) => g[1])
    );

    if (state.movies.length) {
      state.movies.map((d) => {
        const updated = newMovies.find((um) => um.id === d.id);
        const [attribute, group] = Object.entries(updated.axisGroups)[0];

        d.axisGroups = d.axisGroups || {};
        d.axisGroups[attribute] = group;
        return d;
      });
    } else {
      state.movies = newMovies;
    }
  },
  setSimulation(state, simulation) {
    //TODO decide if its needed
    state.simulation = simulation;
  },
  addGroups(state, [attribute, groups]) {
    Vue.set(state.allGroups, attribute, groups);
  },
  setMovies(state, movies) {
    state.movies = movies;
    state.max = Math.max.apply(
      Math,
      movies.map((d) => d.revenue)
    );
  },
  addWinner(state, [attribute, winner]) {
    state.winners[attribute] = winner;
  },
  setRandomMovies(state, movies) {
    state.randomMovies = movies;
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
    vuexContext.dispatch("updateAxisGroups", {
      groupsArr: lengthResults.groups,
    });

    const wordCountshResults = getWordCountResults(movies);
    vuexContext.commit("addGroups", wordCountshResults.groups);
    vuexContext.commit("addWinner", wordCountshResults.winner);
    vuexContext.dispatch("updateAxisGroups", {
      groupsArr: wordCountshResults.groups,
    });

    const releaseMonthResults = getReleaseMonthResults(movies);
    vuexContext.commit("addGroups", releaseMonthResults.groups);
    vuexContext.commit("addWinner", releaseMonthResults.winner);
    vuexContext.dispatch("updateAxisGroups", {
      groupsArr: releaseMonthResults.groups,
    });

    const posterResults = getPosterResults(movies);
    vuexContext.commit("addGroups", posterResults.groups);
    vuexContext.commit("addWinner", posterResults.winner);
  },
  updateAxisGroups(vuexContext, { groupsArr, singleKeyword }) {
    const [attribute, groups] = groupsArr;
    const attr_name = attribute.replace('-age', '');
    vuexContext.commit("setAxisGroup", { groups, attr_name, singleKeyword });
  },
  setSpecificResults: async (vuexContext, key) => {
    const movies = vuexContext.getters.movies();
    switch (key) {
      case "genres-genre_name": {
        return vuexContext.dispatch("setListsResults", {
          movies,
          key: "genres",
          innerKey: "genre_name",
        });
      }
      case "languages-language_name": {
        return vuexContext.dispatch("setListsResults", {
          movies,
          key: "languages",
          innerKey: "language_name",
        });
      }
      case "characters-gender": {
        return vuexContext.dispatch("setPeopleResults", {
          movies,
          key: "characters",
          innerKey: "gender",
          primaryKey: "main",
        });
      }
      case "characters-age": {
        return vuexContext.dispatch("setPeopleResults", {
          movies,
          key: "characters",
          innerKey: "age",
          primaryKey: "main",
        });
      }
      case "directors-gender": {
        return vuexContext.dispatch("setPeopleResults", {
          movies,
          key: "directors",
          innerKey: "gender",
        });
      }
      case "directors-age": {
        return vuexContext.dispatch("setPeopleResults", {
          movies,
          key: "directors",
          innerKey: "age",
        });
      }
      case "producers-country": {
        return vuexContext.dispatch("setListsResults", {
          movies,
          key: "producers",
          innerKey: "country",
        });
      }
      case "restrictions-restriction_name": {
        return vuexContext.dispatch("setListsResults", {
          movies,
          key: "restrictions",
          innerKey: "restriction_name",
        });
      }
    }
  },
  setPeopleResults: async (
    vuexContext,
    { movies, key, innerKey, primaryKey }
  ) => {

    let toReturn;

    if (!movies[0][key]) {
      const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
      await vuexContext.dispatch(`check${capitalized}`);
    }

    if (
      !vuexContext.getters.allGroups[`${key}-age`] ||
      !vuexContext.getters.allGroups[`${key}-gender`] ||
      !vuexContext.getters.winners[`${key}-age`] ||
      !vuexContext.getters.winners[`${key}-gender`]
    ) {
      const peopleResults = getPeopleResults(movies, key, primaryKey);

      if (!vuexContext.getters.allGroups[`${key}-gender`]) {
        vuexContext.commit("addGroups", peopleResults.gender.groups);
      }
      if (!vuexContext.getters.winners[`${key}-gender`]) {
        vuexContext.commit("addWinner", peopleResults.gender.winner);
      }
      if (!vuexContext.getters.allGroups[`${key}-age`]) {
        vuexContext.commit("addGroups", peopleResults.age.groups);
      }
      if (!vuexContext.getters.winners[`${key}-age`]) {
        vuexContext.commit("addWinner", peopleResults.age.winner);
      }

      if (innerKey === "age") {
        vuexContext.dispatch("updateAxisGroups", {
          groupsArr: peopleResults.age.groups,
          singleKeyword: 'age'
        });
      }

      return peopleResults[innerKey].groups[1];
    }

    return vuexContext.getters.allGroups[`${key}-${innerKey}`];
  },
  setListsResults: async (vuexContext, { movies, key, innerKey }) => {
    let toReturn;

    const composeKey = `${key}-${innerKey}`;
    if (!movies[0][key]) {
      const capitalized = key.charAt(0).toUpperCase() + key.slice(1);
      await vuexContext.dispatch(`check${capitalized}`);
    }
    if (
      !vuexContext.getters.allGroups[composeKey] ||
      !vuexContext.getters.winners[composeKey]
    ) {
      const results = getListResults(movies, key, innerKey);

      if (!vuexContext.getters.allGroups[key]) {
        vuexContext.commit("addGroups", results.groups);
      }
      if (!vuexContext.getters.winners[key]) {
        vuexContext.commit("addWinner", results.winner);
      }

      return results.groups[1];
    }

    return vuexContext.getters.allGroups[key];
  },
  addWinner(vuexContext, winner) {
    vuexContext.commit("addWinner", winner);
  },
  checkMovies(vuexContext) {
    if (vuexContext.getters.movies().length === 0) {
      return this.$axios.$get("/movies").then((allTheMovies) => {
        const movies = allTheMovies
          .filter((m) => m.valid)
          .sort((a, b) => b.revenue - a.revenue);
        const moviesToCommit = movies.slice(
          0,
          QUANTITY
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
    const associations = this.$axios.get("/movies-genres");
    const genres = this.$axios.get("/genres");

    return Promise.all([associations, genres]).then((results) => {
      return vuexContext.dispatch("updateMoviesWithGenres", results);
    });
  },
  checkRestrictions(vuexContext) {
    const associations = this.$axios.get("/movies-restrictions");
    const restrictions = this.$axios.get("/restrictions");

    return Promise.all([associations, restrictions]).then((results) => {
      return vuexContext.dispatch("updateMoviesWithRestrictions", results);
    });
  },
  checkProducers(vuexContext) {
    const associations = this.$axios.get("/movies-producers");
    const producers = this.$axios.get("/producers");

    return Promise.all([associations, producers]).then((results) => {
      return vuexContext.dispatch("updateMoviesWithProducers", results);
    });
  },
  checkLanguages(vuexContext) {
    const associations = this.$axios.get("/movies-languages");
    const languages = this.$axios.get("/languages");

    return Promise.all([associations, languages]).then((results) => {
      return vuexContext.dispatch("updateMoviesWithLanguages", results);
    });
  },
  checkDirectors(vuexContext) {
    const associations = this.$axios.get("/movies-directors");
    const directors = this.$axios.get("/directors");

    return Promise.all([associations, directors]).then((results) => {
      return vuexContext.dispatch("updateMoviesWithDirectors", results);
    });
  },
  checkCharacters(vuexContext) {
    const associations = this.$axios.get("/movies-characters");
    const characters = this.$axios.get("/characters");

    return Promise.all([associations, characters]).then((results) => {
      return vuexContext.dispatch("updateMoviesWithCharacters", results);
    });
  },
  updateMoviesWithLanguages(vuexContext, [movies, languages]) {
    languages = languages.data;
    const associations = movies.data;

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
  updateMoviesWithDirectors(vuexContext, [movies, directors]) {
    directors = directors.data;
    const associations = movies.data;

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
  updateMoviesWithCharacters(vuexContext, [movies, characters]) {
    characters = characters.data;
    const associations = movies.data;

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
  updateMoviesWithGenres(vuexContext, [movies, genres]) {
    genres = genres.data;
    const associations = movies.data;

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
  updateMoviesWithRestrictions(vuexContext, [movies, restrictions]) {
    restrictions = restrictions.data;
    const associations = movies.data;

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
  updateMoviesWithProducers(vuexContext, [movies, producers]) {
    producers = producers.data;
    const associations = movies.data;

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
  max(state) {
    return state.max;
  },
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
        return state.movies;//.slice(0,QUANTITY);
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
