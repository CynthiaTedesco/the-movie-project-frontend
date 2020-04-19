<template>
  <div>
    <svg ref="chart" :height="height" :width="width" />
  </div>
</template>

<script>
const d3 = require('d3');
export default {
  name: 'bubbles-in-groups',
    props: {
      groups: Object
    },
  data () {
    return {
      // data: [
      //   { id: 'Steely Dan', name: 'Steely Dan', sales: 40, decade: 'pre-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Beyonce', name: 'Beyonce', sales: 34, decade: 'post-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Madonna', name: 'Madonna', sales: 300, decade: 'pre-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Adam Levine', name: 'Adam Levine', sales: 20, decade: 'post-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Hail', name: 'Hail', sales: 125, decade: 'pre-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Nicky Minaj', name: 'Nicky Minaj', sales: 80, decade: 'post-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Drake', name: 'Drake', sales: 10, decade: 'post-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Justin Beaver', name: 'Justin Beaver', sales: 50, decade: 'post-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Kesha', name: 'Kesha', sales: 60, decade: 'post-2000', image_path: 'assets/images/1.png' },
      //   { id: 'The Eagles', name: 'The Eagles', sales: 150, decade: 'pre-2000', image_path: 'assets/images/1.png' },
      //   { id: 'The Cars', name: 'The Cars', sales: 23, decade: 'pre-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Pat', name: 'Pat', sales: 25, decade: 'pre-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Lady Gaga', name: 'Lady Gaga Dan', sales: 27, decade: 'post-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Tina Turner', name: 'Tina Turner', sales: 84, decade: 'pre-2000', image_path: 'assets/images/1.png' },
      //   { id: 'Fetty', name: 'Fetty', sales: 1, decade: 'post-2000', image_path: 'assets/images/1.png' }],
      height: 600,
      width: 800
    }
  },
  beforeMount () {
    this.data = this.groups['Action'];
    const max = Math.max.apply(Math, this.data.map(d => d.revenue));
    this.scale = d3.scaleLinear()
      .domain([0, max])
      .range([10, 80]);

    // the simulation is a collection of forces 
    // about where we want our circles to go
    // and how we want out circles to interact
    // STEP 1: get them to the middle
    // STEP 2: don't have them collide!
    const simulation = d3
      .forceSimulation(this.data)
      .force('x', d3.forceX().strength(0.05))
      .force('y', d3.forceY().strength(0.05))
      .force("collide", d3.forceCollide(d => this.scale(d.revenue)+2))
      .on('tick', this.ticked);
  },
  mounted () {
    this.svg = d3.select('svg')
      .append("g")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`)
      .attr("class", "nodes")

    this.nodes = this.svg
      .selectAll("circle")
      .data(this.data)
      .enter().append("circle")
      .attr("r", d => this.scale(d.revenue))
  },
  methods: {
    ticked () {
      this.nodes.attr("cx", d => d.x);
      this.nodes.attr("cy", d => d.y);
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  background: purple;
}
</style>