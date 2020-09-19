<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script>
import dimensionable from "@/mixins/dimensionable.js";
import bubbleChartContainer from "@/mixins/bubbleChartContainer.js";
import bubbleChart from "@/mixins/bubbleChart.js";
import { customKey } from "@/assets/js/helpers.js";
const d3 = require("d3");

export default {
  mixins: [dimensionable, bubbleChartContainer, bubbleChart],
  mounted() {
    this.init();
  },
  computed: {
    yScale() {
      const yScale = d3.scaleOrdinal();
      if (this.groups.length <= 3) {
        yScale.domain([1, 2, 3]).range([50, 50, 50]); //percentages
      } else {
        yScale.domain([1, 2, 3, 4, 5, 6]).range([0, 0, 0, 50, 50, 50]); //percentages
      }

      return yScale;
    },
    xScale() {
      const xScale = d3.scaleOrdinal();

      switch (this.groups.length) {
        case 1: {
          xScale.domain([1]).range([50]); //percentages
          break;
        }
        case 2: {
          xScale.domain([1, 2]).range([25, 75]); //percentages
          break;
        }
        case 3: {
          xScale.domain([1, 2, 3]).range([5, 50, 85]); //percentages
          break;
        }
        case 4: {
          xScale.domain([1, 2, 3, 4]).range([5, 30, 60, 90]); //percentages
          break;
        }
        case 5: {
          xScale.domain([1, 2, 3, 4, 5]).range([5, 50, 85, 25, 75]); //percentages
          break;
        }
        default: {
          xScale.domain([1, 2, 3, 4, 5, 6]).range([5, 50, 85, 5, 50, 85]); //percentages
          break;
        }
      }

      return xScale;
    },
  },
  methods: {
    restartSimulation() {
      this.prepareBubbleChartContainerData(); //loads category attribute!
      this.simulation.force("x", d3.forceX(this.xForce).strength(0.1));
      this.simulation.force("y", d3.forceY(this.yForce).strength(0.1));
      this.simulation.alpha(0.75).restart();
      this.resetLabels();
    },
    init() {
      this.$nextTick(() => {
        this.setDimensions();
        d3.select(`#${this.attr} svg`).remove();

        this.draw();
      });
    },
    draw() {
      const props = {
        xForce: this.xForce,
        yForce: this.yForce,
        onTickFn: this.ticked,
      };
      this.createSimulation("category", props);
      this.appendSvg();
      this.appendDefinitions();
      this.appendCircles();

      this.simulation.alpha(1);
      this.simulation.restart();
    },
    xForce(d) {
      if (!this.coordinates[d.category[this.attr].name]) {
        this.coordinates[d.category[this.attr].name] = {
          revenue: d.revenue,
          movieId: d.id,
        };
      }

      let x;
      const container = this.$refs.chartContainer.getBoundingClientRect();
      const percentage = this.xScale(
        d.category[this.attr].position <= 6 ? d.category[this.attr].position : 6
      );

      const xPerPercentage = (percentage * container.width) / 100;
      if (percentage < 20) {
        x = Math.max(170, xPerPercentage);
      } else {
        x = Math.min(container.width - 100, xPerPercentage);
      }

      this.coordinates[d.category[this.attr].name].x = x;

      //no examples for this case
      return x || container.width / 2;
    },
    yForce(d) {
      if (!this.coordinates[d.category[this.attr].name]) {
        this.coordinates[d.category[this.attr].name] = {
          revenue: d.revenue,
          movieId: d.id,
        };
      }

      const percentage = this.yScale(
        d.category[this.attr].position <= 6 ? d.category[this.attr].position : 6
      );
      const container = this.$refs.chartContainer.getBoundingClientRect();
      let y;
      if (this.isMultiline) {
        if (percentage === 0) {
          y = 140;
        } else {
          y = Math.min(700, (75 * container.height) / 100);
        }
      } else {
        y = Math.min(300, container.height / 2);
      }

      this.coordinates[d.category[this.attr].name].y = y;
      return y;
    },
    ticked() {
      const self = this;
      this.nodes.attr("cx", (d) => d.x);
      this.nodes.attr("cy", (d) => {
        if (d.y > self.coordinates[d.category[this.attr].name].y) {
          self.coordinates[d.category[this.attr].name].y = d.y;
          self.coordinates[d.category[this.attr].name].revenue = d.revenue;
          self.coordinates[d.category[this.attr].name].movieId = d.id;
        } else if (
          d.id === self.coordinates[d.category[this.attr].name].movieId
        ) {
          self.coordinates[d.category[this.attr].name].y = d.y;
        }
        return d.y;
      });
    },
    resetLabels(){
      console.log('reseting');
      this.labels.remove();
      this.$nextTick(() => {
        setTimeout(this.setLabels, 700);
      });
    },
    setLabels() {
      this.categoriesNames = [
        ...new Set(
          this.groups.map((group, index) => {
            return index > 4 ? "others" : group[0].toLowerCase();
          })
        ),
      ];

      this.labels = this.svg.append("g").attr("class", "labels");

      for (let i = 0; i < Math.min(this.groups.length, 6); i++) {
        let xx;
        let yy;
        const spacing = this.isMultiline ? 50 : 30;
        const textWidth = this.textWidth(this.categoriesNames[i]);
        const coordinates =
          i === 5 && this.categoriesNames[i] === "others"
            ? this.othersMaxCoordinates
            : this.coordinates[this.groups[i][0]];

        xx = coordinates.x;
        yy = coordinates.y + this.scale(coordinates.revenue) + spacing;
        const label = this.categoriesNames[i];
        this.labels
          .append("text")
          .attr("x", xx)
          .attr("y", yy)
          .attr("fill", "#aa9d9c")
          .attr("font-size", "14")
          .text(label);

        const key = customKey(this.attr, this.singleKeyword);
        if (label === this.$store.getters["winners"][key]) {
          this.labels
            .append("image")
            .attr("href", "/handmade-circle.gif")
            .attr("width", textWidth + 30)
            .attr("height", 34)
            .attr("preserveAspectRatio", "none")
            .attr("x", xx - (textWidth > 150 ? 25 : 15))
            .attr("y", yy - 22);
        }
      }
    },
    adjustLabels() {
      this.labels.selectAll(`#${this.attr} text`).each((text, index, texts) => {
        let xx;
        let yy;
        const spacing = this.isMultiline ? 30 : 30;
        const textWidth = this.textWidth(this.categoriesNames[index]);
        const coordinates =
          index === texts.length - 1 && this.categoriesNames[index] === "others"
            ? this.othersMaxCoordinates
            : this.coordinates[this.groups[index][0]];
        xx = coordinates.x;
        yy = coordinates.y + this.scale(coordinates.revenue) + spacing;
        d3.select(texts[index]).attr("x", xx).attr("y", yy);

        if (index === 0) {
          this.labels
            .select("image")
            .attr("x", xx - 15)
            .attr("y", yy - 22);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>