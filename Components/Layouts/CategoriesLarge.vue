<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script>
import dimensionable from '@/mixins/dimensionable.js';
import bubbleChartContainer from '@/mixins/bubbleChartContainer.js';
import bubbleChart from '@/mixins/bubbleChart.js';
const d3 = require('d3');

export default {
  data () {
    return {
      doit: null,
    }
  },
  mixins: [dimensionable, bubbleChartContainer, bubbleChart],
  mounted () {
    this.$nextTick(() => {
      this.setDimensions();
      d3.select("svg").remove();

      this.draw();
    });
  },
  computed: {
    yScale () {
      const yScale = d3.scaleOrdinal()
      if (this.isMultiline) {
        yScale.domain([1, 2, 3, 4, 5, 6]).range([0, 0, 0, 50, 50, 50]) //percentages
      } else {
        yScale.domain([1, 2, 3]).range([50, 50, 50]) //percentages
      }
      return yScale;
    },
    xScale () {
      return d3
        .scaleOrdinal()
        .domain([1, 2, 3, 4, 5, 6])
        .range([5, 55, 85, 5, 55, 85]) //percentages
    },
  },
  methods: {
    draw () {
      const props = {
        xForce: this.xForce,
        yForce: this.yForce,
        onTickFn: this.ticked
      };
      this.createSimulation('category', props);
      this.appendSvg();
      this.appendDefinitions();
      this.appendCircles();
    },
    xForce (d) {
      if (!this.coordinates[d.category.name]) {
        this.coordinates[d.category.name] = {
          revenue: d.revenue
        }
      }

      let x;
      const container = this.$refs.chartContainer.getBoundingClientRect()
      const percentage = this.xScale(
        d.category.position <= 6 ? d.category.position : 6
      )

      const xPerPercentage = (percentage * container.width) / 100
      if (percentage < 20) {
        x = Math.max(170, xPerPercentage)
      } else if (percentage > 50) {
        x = Math.min(container.width - 100, xPerPercentage)
      }

      this.coordinates[d.category.name].x = x;

      //no examples for this case
      return x || container.width / 2;
    },
    yForce (d) {
      if (!this.coordinates[d.category.name]) {
        this.coordinates[d.category.name] = {
          revenue: d.revenue
        }
      }

      const percentage = this.yScale(
        d.category.position <= 6 ? d.category.position : 6
      )
      const container = this.$refs.chartContainer.getBoundingClientRect()
      let y
      if (this.isMultiline) {
        if (percentage === 0) {
          y = 140
        } else {
          y = Math.min(700, (75 * container.height) / 100)
        }
      } else {
        y = Math.min(300, container.height / 2)
      }

      this.coordinates[d.category.name].y = y;
      return y
    },
    ticked () {
      this.nodes.attr('cx', (d) => d.x)
      this.nodes.attr('cy', (d) => {
        if(d.y > this.coordinates[d.category.name].y){
          this.coordinates[d.category.name].y = d.y;
          this.coordinates[d.category.name].revenue = d.revenue;
        }
        return d.y
      })
    },
  }
}
</script>

<style lang="scss" scoped>
</style>