<template>
  <div ref="chartContainer" class="chart-container">
    <BubbleCloud
      v-for="(group,index) in orderedGroups"
      :key="group[0]"
      :category="group"
      :max="max"
      :ranking="index"
      :style="{'opacity': index === 0 || (renderDone[index-1] ? 1 : 0)}"
      @done="onRenderDone"
    />
  </div>
</template>

<script>
import BubbleCloud from '@/Components/Charts/BubbleCloud.vue';
import bubbleChartContainer from '@/mixins/bubbleChartContainer.js';

export default {
  components: { BubbleCloud },
  mixins: [bubbleChartContainer],
  data () {
    return {
      orderedGroups: [],
      small: true,
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
.chart-container {
  padding: 1rem 10%;
  min-height: 150px;
  height: auto;
  margin-top: -50px;
}
</style>