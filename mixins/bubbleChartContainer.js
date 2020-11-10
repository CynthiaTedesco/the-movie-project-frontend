const d3 = require("d3");
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: [],
    };
  },
  props: {
    movies: Array,
    groups: Array,
    attr: String,
    hasMany: Boolean,
    singleKeyword: String,
    keywordFn: Function,
  },
  watch: {
    movies() {
      this.prepareBubbleChartContainerData();
    },
  },
  mounted() {
    this.prepareBubbleChartContainerData();
  },
  computed: {
    ...mapGetters(["max"]),
    innerNameKey() {
      if (this.hasMany) {
        const singleName = this.attr.slice(0, -1);
        return `${singleName}_name`;
      }

      return "name";
    },
    isMultiline() {
      return this.groups.length > 3;
    },
  },
  methods: {
    prepareBubbleChartContainerData() {
      if (this.movies) {
        const updatedMovies = this.movies.map((m) => {
          m.category = m.category || {};
          if (this.hasMany) {
            const primary = m[this.attr].find((a) => a.primary || a.main);
            if (primary) {
              m.category[this.attr] = {
                name: primary[this.singleKeyword || this.innerNameKey],
                position:
                  this.groups.findIndex(
                    (s) =>
                      s[0] === primary[this.singleKeyword || this.innerNameKey]
                  ) + 1,
              };
            }
            if (this.attr === "producers") {
              m.category[
                this.attr
              ].tooltip = `${primary.name} (${primary.country})`;
            }
          } else {
            let name;
            if (this.attr === "poster") {
              //TODO improve. Repeated code!
              const fn = poster => poster && poster.poster_type ? poster.poster_type.name : "";
              name = fn(m[this.attr]);
            } else {
              name = m[this.attr][this.singleKeyword || this.innerNameKey];
            }
            m.category[this.attr] = {
              name,
              position: this.groups.findIndex((s) => s[0] === name) + 1,
            };
          }
          return m;
        });
        //small display --> draw separate chart for each category
        if (this.small) {
          //create 'others' group if necessary
          if (this.isMultiline && this.groups.length > 6) {
            this.data = [...this.groups.slice(0, 5)];
            const others = this.groups
              .slice(5, this.groups.length)
              .map((a) => a[1])
              .flat();
            this.data.push(["Others", others]);
          } else {
            this.data = this.groups;
          }
        } else {
          //large display --> draw one svg with different groups for each category
          // this.data = updatedMovies;
          if(this.data.length){
            this.data.map(d=>{
              const updated = updatedMovies.find(um=>um.id===d.id);
              d.category[Object.entries(updated.category)[0][0]] = Object.entries(updated.category)[0][1]
              return d;
            })
          } else {
            this.data = updatedMovies;
          }
        }
      }
    },
  },
};
