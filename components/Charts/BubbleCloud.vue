<template>
  <div :id="id"></div>
</template>

<script>
const d3 = require('d3');

export default {
  data () {
    return {
      doit: false
    }
  }, props: {
    data: {
      type: Array,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  beforeMount () {
    this.scale = d3.scaleLinear()
      .domain([0, this.max])
      .range([10, 50]);
  },
  mounted () {
    window.addEventListener('resize', this.eventListenerFn);
    this.draw();
  },
  computed: {
    id () {
      return this.data[0].split(' ').join('-');
    },
    selector () {
      return `#${this.id}`;
    }
  },
  methods: {
    eventListenerFn () {
      clearTimeout(this.doit);
      this.doit = setTimeout(this.resized, 300);
    },
    resized () {
      console.log('resized function!!'); //TODO check
    },
    ticked () {
      this.nodes.attr("cx", d => d.x);
      this.nodes.attr("cy", (d) => {
        return d.y;
      });
    },
    title (d) {
      return d.title.split(' ').join('-')
    },
    draw () {
      console.log('drawing', this.selector + '>svg');
      console.log('removing', this.selector + '>svg');
      // d3.select(this.selector + '>svg').remove();
      const container = d3.select(this.selector).node().getBoundingClientRect();

      // d3.select(this.selector)
      //   .text(this.data[0]);

      const forceX = (d) => {
        return container.width / 2;
      }
      const forceY = (d) => {
        return container.height / 2;
      }

      const simulation = d3
        .forceSimulation(this.data[1])
        .force('x', d3.forceX(forceX).strength(0.1))
        .force('y', d3.forceY(forceY).strength(0.1))
        .force("collide", d3.forceCollide(d => this.scale(d.revenue) + 2))
        .on('tick', this.ticked)
      // .on('end', this.setLabels);

      this.svg = d3.select(this.selector).append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox', '0 0 ' + container.width + ' ' + container.height)
        .attr('preserveAspectRatio', 'xMinYMid meet')
        .attr("class", "nodes")
      if (this.data[0].toLowerCase() === 'action') {
        console.log('SVG', d3.select(this.selector).node());
      }
      //TODO defs should be defined as computed property! or method
      const defs = this.svg.append('defs');

      defs.selectAll(".poster-pattern")
        .data(this.data[1])
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
        .attr("xlink:href", d => {
          return d.poster.url
        })

      this.nodes = this.svg
        .selectAll("circle")
        .data(this.data[1])
        .enter().append("circle")
        .attr('class', (d) => `movie-${d.id}`)
        .attr("r", d => this.scale(d.revenue))
        .attr("fill", d => `url(#${this.title(d)})`)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resized);
  },
};
</script>

<style lang="scss" scoped>
div {
  min-height: 300px;
  max-width: 70vh;
}
</style>
