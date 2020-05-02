<template>
  <div ref="chartContainer" id="my_dataviz"></div>
</template>

<script>
import dimensionable from '@/mixins/dimensionable.js';
import bubblePage from '@/mixins/bubblePage.js';
const d3 = require('d3');

export default {
  layout: 'innerPage',
  mixins: [dimensionable, bubblePage],
  data () {
    return {
      data: []
    }
  },
  watch: {
    movies () {
      this.data = this.movies.slice(0, 4);//[{ revenue: 10, id: 1, title: 'uno' }, { revenue: 54, id: 2, title: 'dos' }, { revenue: 23, id: 3, title: 'tres' }];
      if (this.nodes) {
        if (this.nodes.size() !== this.movies.length) {
          console.log('existing and empty nodes, creating circles!');
          this.appendCircles();
        }
      } else if (this.svg) {
        console.log('unexisting nodes but existing svg, creating circles!');
        this.appendCircles();
      }
    }
  },
  mounted () {
    this.setDimensions();

    this.appendSvg();

    this.data = this.movies.slice(0, 4);
    if (this.data.length) {
      this.appendCircles();
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
div {
  height: calc(100vh - 100px);
}
</style>