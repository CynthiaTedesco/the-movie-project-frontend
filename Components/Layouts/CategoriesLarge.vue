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
      const container = this.$refs.chartContainer.getBoundingClientRect()
      const percentage = this.xScale(
        d.category.position <= 6 ? d.category.position : 6
      )

      const xPerPercentage = (percentage * container.width) / 100
      if (percentage < 20) {
        const x = Math.max(170, xPerPercentage)
        if (this.coordinates.columns[0] === 0) {
          this.coordinates.columns[0] = x
        }
        return x
      } else if (percentage > 50) {
        const x = Math.min(container.width - 100, xPerPercentage)

        if (percentage > 80) {
          if (this.coordinates.columns[2] === 0) {
            this.coordinates.columns[2] = x
          }
        } else {
          if (this.coordinates.columns[1] === 0) {
            this.coordinates.columns[1] = x
          }
        }

        return x
      }

      //no examples for this case
      return container.width / 2;
    },
    yForce (d) {
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

      return y
    },
    ticked () {
      this.nodes.attr('cx', (d) => d.x)
      this.nodes.attr('cy', (d) => {
        if (d.category.position < 4 && d.y > this.coordinates.rows[0]) {
          this.coordinates.rows[0] = d.y
          this.coordinates.revenues[0] = d.revenue
        } else if (d.category.position > 3 && d.y > this.coordinates.rows[1]) {
          this.coordinates.rows[1] = d.y
          this.coordinates.revenues[1] = d.revenue
        }
        return d.y
      })
    },
  }
}
</script>

<style lang="scss" scoped>
</style>