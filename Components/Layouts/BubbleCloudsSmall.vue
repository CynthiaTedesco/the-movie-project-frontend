<template>
  <div ref="chartContainer" class="chart-container">
    <BubbleCloud
      v-for="(group,index) in orderedGroups"
      :key="group[0]"
      :data="group"
      :max="max"
      :ranking="index"
      :style="{'opacity': index === 0 || (renderDone[index-1] ? 1 : 0)}"
      @done="onRenderDone"
    />
  </div>
</template>

<script>
import BubbleCloud from '@/Components/Charts/BubbleCloud.vue';
import dimensionable from '@/mixins/dimensionable.js';
import bubbleChart from '@/mixins/bubbleChart.js';
const d3 = require('d3');

export default {
  components: { BubbleCloud },
  mixins: [dimensionable, bubbleChart],
  data () {
    return {
      orderedGroups: [],
      renderDone: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      }
    }
  },
  beforeMount () {
    //TODO set the groups's quantity based on display height
    if (this.isMultiline) {
      this.orderedGroups = [...this.groups.slice(0, 5)]
      const others = this.groups.slice(5, this.groups.length).map(a => a[1]).flat();
      this.orderedGroups.push(['Others', others]);
    } else {
      this.orderedGroups = this.groups;
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
  margin-top: -100px;
}
</style>