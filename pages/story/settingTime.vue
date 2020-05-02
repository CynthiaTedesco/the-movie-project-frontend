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
          this.createCircles();
        }
      } else if (this.svg) {
        console.log('unexisting nodes but existing svg, creating circles!');
        this.createCircles();
      }
    }
  },
  mounted () {
    this.setDimensions();

    // -1- Create a tooltip div that is hidden by default:
    // var tooltip = d3.select("#my_dataviz")
    //   .append("div")
    //   .style("opacity", 0)
    //   .attr("class", "tooltip")
    //   .style("background-color", "black")
    //   .style("border-radius", "5px")
    //   .style("padding", "10px")
    //   .style("color", "white")

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    var showTooltip = function (d) {
      tooltip
        .transition()
        .duration(200)
      tooltip
        .style("opacity", 1)
        .html("Country: " + d.country)
        .style("left", (d3.mouse(this)[0] + 30) + "px")
        .style("top", (d3.mouse(this)[1] + 30) + "px")
    }
    var moveTooltip = function (d) {
      tooltip
        .style("left", (d3.mouse(this)[0] + 30) + "px")
        .style("top", (d3.mouse(this)[1] + 30) + "px")
    }
    var hideTooltip = function (d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }

    this.svg = d3.select('#my_dataviz').append('svg')
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMinYMid meet')
      .attr("class", "nodes");

    this.data = this.movies.slice(0, 4);
    this.scale = d3.scaleLinear()
      .domain([0, 2797800564])
      .range([10, 50]);
  },
  methods: {
    createCircles () {

      var showTooltip = (d, index, circles) => {
        const origin = circles[index];
        this.tooltip
          .transition()
          .duration(200)
        this.tooltip
          .style("opacity", 1)
          .html("Country: " + d.title)
          .style("left", (d3.mouse(origin)[0] + 30) + "px")
          .style("top", (d3.mouse(origin)[1] + 30) + "px")
      }
      var moveTooltip = (d, index, circles) => {
        const origin = circles[index];
        this.tooltip
          .style("left", (d3.mouse(origin)[0] + 30) + "px")
          .style("top", (d3.mouse(origin)[1] + 30) + "px")
      }
      var hideTooltip = (d) => {
        this.tooltip
          .transition()
          .duration(200)
          .style("opacity", 0)
      }
      this.nodes = this.svg
        .selectAll("circle")
        .data(this.data)
        .enter().append("circle")
        .attr('class', (d) => `movie-${d.id}`)
        .attr("r", d => this.scale(d.revenue))
        .attr("cx", (d, i) => d.id * Math.random() * 100 * i)
        .attr("cy", 300)
        .attr("fill", d => 'red')
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  height: calc(100vh - 100px);
}
</style>