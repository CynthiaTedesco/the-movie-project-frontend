const d3 = require("d3");
import { beautifyCashValue } from "@/assets/js/helpers.js";

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
    winner: String,
    // hasMany: Boolean,
    singleKeyword: String,
  },
  mounted() {
    if (this.movies && this.groups) {
      this.groups.map((group) => {
        group[1] = group[1].map((m) => {
          m.axisGroups = m.axisGroups || {};

          let lead;
          let tooltip = "";
          if (this.singleKeyword === "age") {
            lead = m[this.attr].find((a) => a.main);
            tooltip = lead ? `${lead.name} (${lead.age})` : "";
          } else {
            switch (this.attr) {
              case "budget": {
                tooltip = beautifyCashValue(m[this.attr]);
              }
            }
          }

          m.axisGroups[this.attr] = {
            name: group[0],
            tooltip,
          };

          return m;
        });
      });

      //merge movies with axis data
      this.data = [].concat.apply(
        [],
        this.groups.map((g) => g[1])
      );
      this.data = this.data.sort((m1, m2) => m1.revenue - m2.revenue);
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
