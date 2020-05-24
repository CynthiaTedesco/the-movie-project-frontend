const d3 = require("d3");
import { slices } from "@/assets/js/helpers.js";
import AGES from "@/constants/ages.js";
import BUDGETS from "@/constants/budgets.js";
import WORD_COUNTS from "@/constants/wordCounts.js";
import LENGTHS from "@/constants/lengths.js";
import MONTHS from "@/constants/months.js";

export default {
  data() {
    return {
      movies: [],
      groups: {},
      svg: null,
      nodes: null,
      winner: String
    };
  },
  async beforeMount() {
    if (this.hasMany) {
      const capitalized = this.keyword.replace(/^\w/, (c) => c.toUpperCase());
      const functionName = `check${capitalized}`;
      await this.$store.dispatch(functionName);
    }

    //deep copy
    this.movies = JSON.parse(
      JSON.stringify(await this.$store.getters.movies(slices()))
    );
    const temp = this.groupBy(this.movies, this.keyword, this.hasMany);
    if (this.axis) {
      if (this.singleKeyword && this.singleKeyword === "age") {
        this.groups = this.getAgesGroups(temp);
      } else {
        switch (this.keyword) {
          case "release_date": {
            this.groups = this.getMonthsGroups(temp);
            break;
          }
          case "budget": {
            this.groups = this.getBudgetsGroups(temp);
            break;
          }
          case "length": {
            this.groups = this.getLenghtsGroups(temp);
            break;
          }
          case "word_count": {
            this.groups = this.getWordCountsGroups(temp);
            break;
          }
        }
      }
    } else {
      //TODO SORT BY GROUP TOTAL REVENUE!
      this.groups = Object.entries(temp).sort(
        (a, b) => b[1].length - a[1].length
      );
    }

    this.setWinner();
  },

  methods: {
    setWinner(){
      this.winner = [...this.groups].sort((group1, group2)=>{
        const total1 = group1[1].map(a=>parseFloat(a.revenue)).reduce((a, b) => a + b, 0);
        const total2 = group2[1].map(a=>parseFloat(a.revenue)).reduce((a, b) => a + b, 0);

        return total2 - total1
      })[0][0];
    },
    groupBy(xs, key) {
      return xs.reduce((rv, x) => {
        let innerKey;
        if (this.hasMany) {
          if (!this.singleKeyword) {
            let singleKeyword = this.keyword.slice(0, -1);
            singleKeyword =
              singleKeyword === "character" ? "actor" : singleKeyword;
            this.singleKeyword = `${singleKeyword}_name`;
          }
          innerKey = x[key].find((a) => a.primary || a.main)[
            this.singleKeyword
          ];
        } else {
          if(this.plain){
            innerKey = x[key]
          } else {
            innerKey = x[key] ? x[key].name : "";
          }
        }
        if (innerKey) {
          (rv[innerKey] = rv[innerKey] || []).push(x);
        }
        return rv;
      }, {});
    },
    getAgesGroups(base) {
      const temp = AGES.map((ageLabel) => {
        return [ageLabel, []];
      });

      Object.entries(base).map((entry) => {
        const age = entry[0];
        const movies = entry[1];
        if (age <= 15) {
          temp[0][1] = temp[0][1].concat(movies);
        } else if (age <= 20) {
          temp[1][1] = temp[1][1].concat(movies);
        } else if (age <= 25) {
          temp[2][1] = temp[2][1].concat(movies);
        } else if (age <= 30) {
          temp[3][1] = temp[3][1].concat(movies);
        } else if (age <= 35) {
          temp[4][1] = temp[4][1].concat(movies);
        } else if (age <= 40) {
          temp[5][1] = temp[5][1].concat(movies);
        } else if (age <= 45) {
          temp[6][1] = temp[6][1].concat(movies);
        } else if (age <= 50) {
          temp[7][1] = temp[7][1].concat(movies);
        } else if (age <= 55) {
          temp[8][1] = temp[8][1].concat(movies);
        } else if (age <= 60) {
          temp[9][1] = temp[9][1].concat(movies);
        } else if (age >= 60) {
          temp[10][1] = temp[10][1].concat(movies);
        }
      });

      return temp;
    },
    getWordCountsGroups(base) {
      const temp = WORD_COUNTS.map((wordCountLabel) => {
        return [wordCountLabel, []];
      });
      Object.entries(base).map((entry) => {
        const count = entry[0];
        const movies = entry[1];
        if (count <= 15) {
          temp[0][1] = temp[0][1].concat(movies);
        } else if (count <= 20) {
          temp[1][1] = temp[1][1].concat(movies);
        } else if (count <= 25) {
          temp[2][1] = temp[2][1].concat(movies);
        } else if (count <= 30) {
          temp[3][1] = temp[3][1].concat(movies);
        } else if (count <= 35) {
          temp[4][1] = temp[4][1].concat(movies);
        } else if (count <= 40) {
          temp[5][1] = temp[5][1].concat(movies);
        } else if (count <= 45) {
          temp[6][1] = temp[6][1].concat(movies);
        } else if (count <= 50) {
          temp[7][1] = temp[7][1].concat(movies);
        } else if (count <= 55) {
          temp[8][1] = temp[8][1].concat(movies);
        } else if (count <= 60) {
          temp[9][1] = temp[9][1].concat(movies);
        } else if (count >= 60) {
          temp[10][1] = temp[10][1].concat(movies);
        }
      });

      return temp;
    },
    getLenghtsGroups(base) {
      const temp = LENGTHS.map((lengthLabel) => {
        return [lengthLabel, []];
      });
      Object.entries(base).map((entry) => {
        const length = entry[0];
        const movies = entry[1];
        if (length <= 15) {
          temp[0][1] = temp[0][1].concat(movies);
        } else if (length <= 20) {
          temp[1][1] = temp[1][1].concat(movies);
        } else if (length <= 25) {
          temp[2][1] = temp[2][1].concat(movies);
        } else if (length <= 30) {
          temp[3][1] = temp[3][1].concat(movies);
        } else if (length <= 35) {
          temp[4][1] = temp[4][1].concat(movies);
        } else if (length <= 40) {
          temp[5][1] = temp[5][1].concat(movies);
        } else if (length <= 45) {
          temp[6][1] = temp[6][1].concat(movies);
        } else if (length <= 50) {
          temp[7][1] = temp[7][1].concat(movies);
        } else if (length <= 55) {
          temp[8][1] = temp[8][1].concat(movies);
        } else if (length <= 60) {
          temp[9][1] = temp[9][1].concat(movies);
        } else if (length >= 60) {
          temp[10][1] = temp[10][1].concat(movies);
        }
      });

      return temp;
    },
    getBudgetsGroups(base) {
      const temp = BUDGETS.map((budgetLabel) => {
        return [budgetLabel, []];
      });
      Object.entries(base).map((entry) => {
        const budget = entry[0]/10e5;
        const movies = entry[1];
        if (budget < 100) {
          temp[0][1] = temp[0][1].concat(movies);
        } else if (budget < 150) {
          temp[1][1] = temp[1][1].concat(movies);
        } else if (budget < 200) {
          temp[2][1] = temp[2][1].concat(movies);
        } else if (budget < 250) {
          temp[3][1] = temp[3][1].concat(movies);
        } else if (budget < 300) {
          temp[4][1] = temp[4][1].concat(movies);
        } else if (budget < 350) {
          temp[5][1] = temp[5][1].concat(movies);
        } else {
          temp[6][1] = temp[6][1].concat(movies);
        }
      });

      return temp;
    },
    getMonthsGroups(base) {
      const temp = MONTHS.map((monthLabel) => {
        return [monthLabel, []];
      });
      Object.entries(base).map((entry) => {
        const month = entry[0];
        const movies = entry[1];
        if (month <= 15) {
          temp[0][1] = temp[0][1].concat(movies);
        } else if (month <= 20) {
          temp[1][1] = temp[1][1].concat(movies);
        } else if (month <= 25) {
          temp[2][1] = temp[2][1].concat(movies);
        } else if (month <= 30) {
          temp[3][1] = temp[3][1].concat(movies);
        } else if (month <= 35) {
          temp[4][1] = temp[4][1].concat(movies);
        } else if (month <= 40) {
          temp[5][1] = temp[5][1].concat(movies);
        } else if (month <= 45) {
          temp[6][1] = temp[6][1].concat(movies);
        } else if (month <= 50) {
          temp[7][1] = temp[7][1].concat(movies);
        } else if (month <= 55) {
          temp[8][1] = temp[8][1].concat(movies);
        } else if (month <= 60) {
          temp[9][1] = temp[9][1].concat(movies);
        } else if (month >= 60) {
          temp[10][1] = temp[10][1].concat(movies);
        }
      });

      return temp;
    },
  },
};
