<template>
  <section class="page-container">
    <InnerPageDescription
      question="When does the movie should take place?"
      :text="text"
      ordinal="5"
    />
    <div ref="chartContainer" id="my_dataviz"></div>
    <!-- <Bubbles 
      v-if="Object.keys(groups).length" 
      :movies="movies" 
      :groups="groups" 
      attr="genres"
    name="genre_name"/>-->
  </section>
</template>

<script>
import dimensionable from '@/mixins/dimensionable.js';
import bubblePage from '@/mixins/bubblePage.js';
import InnerPageDescription from "@/Components/InnerPageDescription";
const d3 = require('d3');

export default {
  layout: 'innerPage',
  mixins: [dimensionable, bubblePage],
  components: { InnerPageDescription },
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
  },
  computed: {
    text () {
      if (this.groups.length) {
        const name = this.groups[0][0];
        return `You cannot go wrong with a movie set in ${name.toLowerCase()}!`;
      }

      return '';
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  height: calc(100vh - 100px);
}
</style>