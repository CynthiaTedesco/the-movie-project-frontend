const d3 = require("d3");
import {
  slices,
  customKey,
  getAgesGroups,
  getMonthsGroups,
  getBudgetsGroups,
  getLengthsGroups,
  getWordCountsGroups,
  simpleGroups,
  calculateWinner,
} from "@/assets/js/helpers.js";

export default {
  data() {
    return {
      movies: [],
      groups: {},
      svg: null,
      nodes: null,
    };
  },
  async beforeMount() {
    this.preProcess();
  },
  methods: {
    async preProcess() {
        if (this.hasMany) {
          const capitalized = this.keyword.replace(/^\w/, (c) =>
            c.toUpperCase()
          );
          const functionName = `check${capitalized}`;
          await this.$store.dispatch(functionName);
        }

        //deep copy
        this.movies = JSON.parse(
          JSON.stringify(await this.$store.getters.movies(slices()))
        );

        const temp = this.groupBy(this.keyword);

        if (this.axis) {
          if (this.singleKeyword && this.singleKeyword === "age") {
            this.groups = getAgesGroups(temp, this.movies.length);
          } else {
            switch (this.keyword) {
              case "release_date": {
                this.groups = getMonthsGroups(temp, this.movies.length);
                break;
              }
              case "budget": {
                this.groups = getBudgetsGroups(temp, this.movies.length);
                break;
              }
              case "length": {
                this.groups = getLengthsGroups(temp, this.movies.length);
                break;
              }
              case "word_count": {
                this.groups = getWordCountsGroups(temp, this.movies.length);
                break;
              }
            }
          }
        } else {
          this.groups = simpleGroups(temp, this.movies.length);
        }

      this.setWinner();
    },
    setWinner() {
      const winner = calculateWinner(this.groups);
      const key = customKey(this.keyword, this.singleKeyword);
      this.$store.dispatch("addWinner", [key, winner.toLowerCase()]);
    },
    groupBy(key) {
      //TODO replace repeated and messy code by using helper functions
      return this.movies.reduce((rv, x) => {
        let innerKey;
        if (key === "word_count") {
          innerKey = this.keywordFn(x);
        } else if (key === "release_date" || key === "poster") {
          innerKey = this.keywordFn(x[key]);
        } else {
          if (this.hasMany) {
            if (!this.singleKeyword) {
              let singleKeyword = this.keyword.slice(0, -1);
              singleKeyword =
                singleKeyword === "character" ? "actor" : singleKeyword;
              this.singleKeyword = `${singleKeyword}_name`;
            }
            const primary = x[key].find((a) => a.primary || a.main);
            innerKey = primary ? primary[this.singleKeyword] : "";
          } else {
            if (this.plain) {
              innerKey = x[key];
            } else {
              innerKey = x[key] ? x[key].name : "";
            }
          }
        }
        if (innerKey) {
          (rv[innerKey] = rv[innerKey] || []).push(x);
        }
        return rv;
      }, {});
    },
  },
};
