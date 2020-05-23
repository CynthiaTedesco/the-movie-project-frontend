const d3 = require("d3");

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
    // hasMany: Boolean,
    singleKeyword: String,
  },
  mounted() {
    if (this.movies && this.groups) {
      this.groups.map((group) => {
        group[1] = group[1].map((m) => {
          m.axisGroups = m.axisGroups || {};

          let lead;
          if (this.singleKeyword === "age") {
            lead = m.characters.find((a) => a.main);
          }
          const tooltip = lead ? `${lead.name} (${lead.age})` : "";

          m.axisGroups[this.attr] = {
            name: group[0],
            tooltip,
          };

          return m;
        });
      });

      //merge movies with axis data
      this.data = [].concat.apply([], this.groups.map(g=>g[1]));
    }
  },
  computed: {
    max() {
      return Math.max.apply(
        Math,
        this.movies.map((d) => d.revenue)
      );
    },
  },
};
