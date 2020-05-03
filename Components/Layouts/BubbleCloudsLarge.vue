<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script>
import dimensionable from '@/mixins/dimensionable.js';
import bubbleChart from '@/mixins/bubbleChart.js';
const d3 = require('d3');

export default {
  data () {
    return {
      doit: null,
    }
  },
  mixins: [dimensionable, bubbleChart],
  mounted () {
    this.$nextTick(() => {
      this.setDimensions();
      d3.select("svg").remove();

      this.draw();
    });
  },
  methods: {
    ticked () {
      this.nodes.attr("cx", d => d.x);
      this.nodes.attr("cy", (d) => {
        if (d.group < 4 && d.y > this.coordinates.rows[0]) {
          this.coordinates.rows[0] = d.y;
          this.coordinates.revenues[0] = d.revenue;
        } else if (d.group > 3 && d.y > this.coordinates.rows[1]) {
          this.coordinates.rows[1] = d.y;
          this.coordinates.revenues[1] = d.revenue;
        }
        return d.y;
      });
    },
    draw () {
      this.createSimulation('category');
      this.appendSvg();
      this.appendDefinitions();
      this.appendCircles();
    },
  }
}
</script>

<style lang="scss" scoped>
</style>