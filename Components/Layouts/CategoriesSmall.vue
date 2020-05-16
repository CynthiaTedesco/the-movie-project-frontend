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
      :max="max"
      :ranking="index"
      :style="{'opacity': index === 0 || (renderDone[index-1] ? 1 : 0)}"
      @done="onRenderDone"
    />
  </b-carousel>
</template>

<script>
import BubbleCloud from '@/Components/Charts/BubbleCloud.vue';
import bubbleChartContainer from '@/mixins/bubbleChartContainer.js';

export default {
  components: { BubbleCloud },
  mixins: [bubbleChartContainer],
  data () {
    return {
      small: true,
      activeCase: 0,
      renderDone: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      }
    }
  },
  methods: {
    onRenderDone (ranking) {
      this.renderDone[ranking] = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/common.scss';

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
    margin-right: -3.5rem;
    color: $blue-ferdio;
  }
  /deep/ .carousel-control-prev {
    margin-left: -3.5rem;
    color: $blue-ferdio;
  }
}
</style>