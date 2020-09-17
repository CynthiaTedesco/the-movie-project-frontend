<template>
  <b-carousel
    ref="chartContainer"
    id="carousel-1"
    class="chart-container carousel"
    :interval="0"
    controls
  >
    <BubbleCloud
      class="carousel-item"
      :class="{active: activeCase === index}"
      v-for="(group,index) in data"
      :key="group[0]"
      :category="group"
      :singleKeyword="singleKeyword"
      :attr="attr"
      :max="max"
      :ranking="index"
      @done="onRenderDone"
    />
  </b-carousel>
</template>

<script>
import BubbleCloud from "@/Components/Charts/BubbleCloud.vue";
import bubbleChartContainer from "@/mixins/bubbleChartContainer.js";

export default {
  components: { BubbleCloud },
  mixins: [bubbleChartContainer],
  watch: {
    groups() {
      this.$nextTick(() => {
        //TODO DO SOMETHING!
        // this.restartSimulation();
      });
    },
  },
  data() {
    return {
      small: true,
      activeCase: 0,
      renderDone: {}
    };
  },
  props: {
    singleKeyword: String,
  },
  mounted() {
    this.groups.map((b, i) => (this.renderDone[i] = false));
  },
  methods: {
    onRenderDone(ranking) {
      this.renderDone[ranking] = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

.chart-container {
  padding: 1rem 10%;
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