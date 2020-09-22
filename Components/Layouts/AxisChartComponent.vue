<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script>
import BubbleCloud from "@/Components/Charts/BubbleCloud.vue";
import axisBubblesChartContainer from "@/mixins/axisBubblesChartContainer.js";
import dimensionable from "@/mixins/dimensionable.js";
import axisBubblesChart from "@/mixins/axisBubblesChart.js";
import AGES from "@/constants/ages.js";
const d3 = require("d3");

export default {
  components: { BubbleCloud },
  mixins: [axisBubblesChartContainer, dimensionable, axisBubblesChart],
  data() {
    return {
      small: true,
      axis: true,
    };
  },
  props: {
    singleKeyword: String,
  },
  watch: {
    width(current, old) {
      this.draw();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setDimensions();
      this.draw();
    });
  },
  methods: {
    restartSimulation() {
      if (this.simulation) {
        this.prepareAxisBubbleChartContainer(); //resets chart data

        this.appendAxis();
        this.appendCircles();
      }
    },
    draw() {
      const props = {
        xForce: this.xForce,
        yForce: this.yForce,
        onTickFn: this.ticked,
      };
      this.createSimulation(props);
      this.appendSvg();
      this.appendAxis();
      this.appendDefinitions();
      this.appendCircles();
    },
    xValue(d) {
      return d.axisGroups[this.attr].name;
    },
    xForce(d) {
      return this.xScale(this.xValue(d));
    },
    yForce(d) {
      return this.innerHeight;
    },
    ticked() {
      const self = this;
      this.nodes.attr("cy", (d) => {
        const toReturn = Math.min(d.y, self.innerHeight - 40);
        return toReturn < -1 ? self.scale(d.revenue) * 2.2 : toReturn;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

.chart-container {
  min-height: 150px;
  height: auto;
}
.carousel {
  width: 100%;
  height: 100%;
  overflow: hidden;

  /deep/ .carousel-inner {
    height: 100%;
    overflow: visible;
  }

  /deep/ .carousel-control-next {
    .carousel-control-next-icon {
      width: 30px;
      height: 30px;
      background-image: url("/right-arrow.png");
      // background-image: url('data:image/svg+xml,%3csvg xmlns=http://www.w3.org/2000/svg fill=%23fff width=8 height=8 viewBox=0 0 8 8%3e%3cpath stroke="#000" d=M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z/%3e%3c/svg%3e');
    }
  }
  /deep/ .carousel-control-prev {
    .carousel-control-prev-icon {
      width: 30px;
      height: 30px;
      background-image: url("/left-arrow.png");
      // background-image: url(data:image/svg+xml,%3csvg xmlns=http://www.w3.org/2000/svg fill=%23fff width=8 height=8 viewBox=0 0 8 8%3e%3cpath d=M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z/%3e%3c/svg%3e);
    }
  }
}
</style>