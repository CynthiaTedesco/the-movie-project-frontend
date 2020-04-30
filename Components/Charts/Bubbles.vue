<template>
  <BubbleCloudsSmall 
    v-if="this.display==='small'" 
    :max="maxRevenue"
    :sortByQty="sortByQty" />

  <BubbleCloudsLarge 
    v-else 
    :data="data" 
    :max="maxRevenue" 
    :sortByQty="sortByQty"/>
</template>

<script>
const d3 = require('d3');
import BubbleCloudsSmall from '@/Components/Layouts/BubbleCloudsSmall.vue';
import BubbleCloudsLarge from '@/Components/Layouts/BubbleCloudsLarge.vue';
import resizable from '@/mixins/resizable.js';

export default {
  name: 'bubbles',
  components: { BubbleCloudsSmall, BubbleCloudsLarge },
  mixins: [resizable],
  props: {
    groups: Object,
    movies: Array,
    attr: String,
    name: String
  },
  data () {
    return {
      maxRevenue: 0,
      sortByQty: [],
      data: [],
    }
  },
  beforeMount () {
    this.sortByQty = Object.entries(this.groups).sort((a, b) => b[1].length - a[1].length);
    this.data = this.movies.map(m => {
      const primary = m[this.attr].find(a => a.primary);
      m.primary = primary;
      m.primaryPos = this.sortByQty.findIndex(s => s[0] === primary[this.name]) + 1;
      return m;
    })
    this.maxRevenue = Math.max.apply(Math, this.data.map(d => d.revenue));
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/common.scss';
svg {
  overflow: visible;
}
</style>