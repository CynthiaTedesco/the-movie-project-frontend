<template>
  <div ref="chartContainer" class="chart-container">
    <!-- <svg ref="chart" :height="height" :width="width" /> -->
  </div>
</template>

<script>
const d3 = require('d3');
export default {
  name: 'bubbles-in-groups',
  props: {
    groups: Object,
    movies: Array,
    attr: String
  },
  data () {
    return {
      height: 600,
      width: 800
    }
  },
  beforeMount () {
    const sortByQty = Object.entries(this.groups).sort((a, b) => b[1].length - a[1].length);
    this.data = this.movies.map(m => {
      const primary = m[this.attr].find(a => a.primary);
      m.primary = primary;
      m.primaryPos = sortByQty.findIndex(s => s[0] === primary['genre_name']) + 1;
      return m;
    })
    const max = Math.max.apply(Math, this.data.map(d => d.revenue));
    this.scale = d3.scaleLinear()
      .domain([0, max])
      .range([10, 50]);
  },
  mounted () {
    const xScale = d3.scaleOrdinal()
      .domain([1, 2, 3, 4, 5, 6])
      .range([20, 50, 80, 20, 50, 80])//percentages
    const yScale = d3.scaleOrdinal()
      .domain([1, 2, 3, 4, 5, 6])
      .range([0, 0, 0, 50, 50, 50])//percentages

    const forceX = (d) => {
      const container = this.$refs.chartContainer.getBoundingClientRect();
      const percentage = container.width<1001 ? 50 : xScale(d.primaryPos <= 6 ? d.primaryPos : 6);
      // return container.width/2;

      console.log('X--------', d.title, d.primary.genre_name, percentage, percentage * container.width / 100);
      return percentage * container.width / 100;
    }
    const forceY = (d) => {
      const percentage = yScale(d.primaryPos <= 6 ? d.primaryPos : 6);
      const container = this.$refs.chartContainer.getBoundingClientRect();
      debugger
      // if(this.width<1000){
      //   if(Math.random(0,1)*100>50){
      //     return 270;
      //   } else {
      //     return 800
      //   }
      // }
      if (percentage === 0) {
        return 170;
      } else {
        return container.height - 150;
      }
      // console.log('Y --------', d.title, d.primary.genre_name, percentage, percentage*container.height/100);
      // return percentage*container.height/100;
    }
    // the simulation is a collection of forces 
    // about where we want our circles to go
    // and how we want out circles to interact
    // STEP 1: get them to the middle
    // STEP 2: don't have them collide!
    const simulation = d3
      .forceSimulation(this.data)
      .force('x', d3.forceX(forceX).strength(0.05))
      .force('y', d3.forceY(forceY).strength(0.05))
      .force("collide", d3.forceCollide(d => this.scale(d.revenue) + 2))
      .on('tick', this.ticked);



    this.svg = d3.select('.chart-container').append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', '0 0 ' + Math.min(this.width, this.height) + ' ' + Math.min(this.width, this.height))
      .attr('preserveAspectRatio', 'xMinYMin')
      .append("g")
      // .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`)
      .attr("class", "nodes")

    const defs = this.svg.append('defs');

    defs.selectAll(".poster-pattern")
      .data(this.data)
      .enter()
      .append("pattern")
      .attr("class", ".poster-pattern")
      .attr('id', this.title)
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('patternContentUnits', 'objectBoundingBox')
      .append('image')
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", d => d.poster.url)

    this.nodes = this.svg
      .selectAll("circle")
      .data(this.data)
      .enter().append("circle")
      .attr("r", d => this.scale(d.revenue))
      .attr("fill", d => `url(#${this.title(d)})`)
  },
  methods: {
    title (d) {
      return d.title.split(' ').join('-')
    },
    ticked () {
      this.nodes.attr("cx", d => d.x);
      this.nodes.attr("cy", d => d.y);
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/common.scss';

.page-container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr;
  // grid-template-rows: repeat(6, 1fr);

  @include media-breakpoint-up(md) {
    grid-template-columns: 16% 84%;
  }
}
svg {
  @include media-breakpoint-up(lg) {
    max-height: 83vh;
  }
  // background: chartreuse;
// }
// g {
//   max-height: 83vh;
//   background: palevioletred;
}
</style>