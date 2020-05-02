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
      <!-- v-show="index === 0 || renderDone[index-1]" -->
  </div>
</template>

<script>
import BubbleCloud from '@/Components/Charts/BubbleCloud.vue';
import dimensionable from '@/mixins/dimensionable.js';
import resizable from '@/mixins/resizable.js';
const d3 = require('d3');

export default {
  components: { BubbleCloud },
  mixins: [dimensionable, resizable],
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
  props: {
    max: Number,
    sortByQty: {
      type: Array,
      required: true
    }
  },
  beforeMount () {
    //TODO set the groups's quantity based on display height
    const others = this.sortByQty.slice(5, this.sortByQty.length).map(a => a[1]).flat();
    this.orderedGroups = [...this.sortByQty.slice(0, 5)]
    this.orderedGroups.push(['Others', others]);
  },
  methods: {
    onRenderDone (ranking) {
      this.renderDone[ranking] = true;
      console.log('on render done!!', ranking);
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  padding: 1rem 10%;
  margin-top: 2rem;
  min-height: 150px;
}
</style>