import tooltip from '@/mixins/tooltip.js'
const d3 = require('d3')

export default {
  mixins: [tooltip],
  data() {
    return {
      movies: [],
      groups: {},
      svg: null,
      nodes: null,
    }
  },
  async beforeMount() {
    await this.$store.dispatch('checkGenres') //TODO de-hardcode this
    this.movies = await this.$store.getters.movies
    const temp = this.groupBy(this.movies, 'genres')
    this.groups = Object.entries(temp).sort((a, b) => b[1].length - a[1].length)
  },
  computed: {
    scale() {
      const max = Math.max.apply(
        Math,
        this.movies.map((d) => d.revenue)
      )
      return d3
        .scaleLinear()
        .domain([0, max])
        .range([10, 50])
    },
  },
  methods: {
    appendSvg() {
      this.svg = d3
        .select('#my_dataviz')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        .attr('preserveAspectRatio', 'xMinYMid meet')
        .attr('class', 'nodes')
    },
    appendCircles() {
      this.nodes = this.svg
        .selectAll('circle')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('class', (d) => `movie-${d.id}`)
        .attr('r', (d) => this.scale(d.revenue))
        .attr('cx', (d, i) => d.id * Math.random() * 100 * i)
        .attr('cy', 300)
        .attr('fill', (d) => 'red')
        .on('mouseover', this.showTooltip)
        .on('mousemove', this.moveTooltip)
        .on('mouseleave', this.hideTooltip)
    },
    groupBy(xs, key) {
      return xs.reduce(function(rv, x) {
        const innerKey = x[key].find((a) => a.primary).genre_name
        ;(rv[innerKey] = rv[innerKey] || []).push(x)
        return rv
      }, {})
    },
  },
}
