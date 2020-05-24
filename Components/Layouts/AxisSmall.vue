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
      small: true
    };
  },
  props: {
    singleKeyword: String
  },
  watch: {
    width(current, old) {
      console.log(`width has changed from ${old} to ${this.width}`);
      this.draw();
    },
    height(current, old) {
      console.log(`height has changed from ${old} to ${this.height}`);
      this.draw();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setDimensions();
      // d3.select(`#${this.attr} svg`).remove();
      this.draw();
    });
  },
  methods: {
    draw() {
      // const props = {
      //   xForce: this.xForce,
      //   yForce: this.yForce,
      //   onTickFn: this.ticked
      // };
      // this.createSimulation('category', props);
      this.appendSvg();
      this.appendAxis();
      // this.appendDefinitions();
      // this.appendCircles();
    }
    // xForce (d) {
    //   if (!this.coordinates[d.category[this.attr].name]) {
    //     this.coordinates[d.category[this.attr].name] = {
    //       revenue: d.revenue,
    //       movieId: d.id
    //     }
    //   }

    //   let x;
    //   const container = this.$refs.chartContainer.getBoundingClientRect()
    //   const percentage = this.xScale(
    //     d.category[this.attr].position <= 6 ? d.category[this.attr].position : 6
    //   )

    //   const xPerPercentage = (percentage * container.width) / 100
    //   if (percentage < 20) {
    //     x = Math.max(170, xPerPercentage)
    //   } else {
    //     x = Math.min(container.width - 100, xPerPercentage)
    //   }

    //   this.coordinates[d.category[this.attr].name].x = x;

    //   //no examples for this case
    //   return x || container.width / 2;
    // },
    // yForce (d) {
    //   if (!this.coordinates[d.category[this.attr].name]) {
    //     this.coordinates[d.category[this.attr].name] = {
    //       revenue: d.revenue,
    //       movieId: d.id
    //     }
    //   }

    //   const percentage = this.yScale(
    //     d.category[this.attr].position <= 6 ? d.category[this.attr].position : 6
    //   )
    //   const container = this.$refs.chartContainer.getBoundingClientRect()
    //   let y
    //   if (this.isMultiline) {
    //     if (percentage === 0) {
    //       y = 140
    //     } else {
    //       y = Math.min(700, (75 * container.height) / 100)
    //     }
    //   } else {
    //     y = Math.min(300, container.height / 2)
    //   }

    //   this.coordinates[d.category[this.attr].name].y = y;
    //   return y
    // },
    // ticked () {
    //   const self = this;
    //   this.nodes.attr('cx', (d) => d.x)
    //   this.nodes.attr('cy', (d) => {
    //     if (d.y > self.coordinates[d.category[this.attr].name].y) {
    //       self.coordinates[d.category[this.attr].name].y = d.y;
    //       self.coordinates[d.category[this.attr].name].revenue = d.revenue;
    //       self.coordinates[d.category[this.attr].name].movieId = d.id;
    //     } else if (d.id === self.coordinates[d.category[this.attr].name].movieId) {
    //       self.coordinates[d.category[this.attr].name].y = d.y;
    //     }
    //     return d.y
    //   })
    // },
  }
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