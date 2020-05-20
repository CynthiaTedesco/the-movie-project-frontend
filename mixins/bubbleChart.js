const d3 = require('d3')
import { isMobile } from '@/assets/js/helpers.js'
import tooltip from '@/mixins/tooltip.js'

export default {
  mixins: [tooltip],
  data() {
    return {
      svg: null,
      nodes: null,
      simulation: null,
      categoriesNames: [],
    }
  },
  beforeDestroy() {
    this.simulation.stop()
  },
  props: {
    movies: Array,
  },
  watch: {
    nodes(a, b) {
      this.$nextTick(() => {
        setTimeout(this.setLabels, 1000)
      })
    },
  },
  computed: {
    scale() {
      const maxRadius = isMobile()
        ? (document.documentElement.clientWidth * 0.3) / 2
        : 50
      return d3
        .scaleLinear()
        .domain([0, this.max])
        .range([10, maxRadius])
    },
    othersMaxCoordinates() {
      const others = this.groups.slice(5 - this.groups.length).map((o) => o[0])
      let othersMaxCoordinates = { y: 0 }
      others.forEach((categoryName) => {
        const temp = this.coordinates[categoryName]
        if (temp.y > othersMaxCoordinates.y) {
          othersMaxCoordinates = temp
        }
      })

      return othersMaxCoordinates
    },
  },
  methods: {
    appendSvg() {
      this.svg = d3
        .select(this.selector || '.chart-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        .attr('preserveAspectRatio', 'xMinYMid meet')
        .attr('class', 'nodes')
    },
    appendCircles(data = this.data) {
      this.nodes = this.svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', (d) => `movie-${d.id}`)
        .attr('r', (d) => this.scale(d.revenue))
        .attr('fill', (d) => `url(#${this.defTitle(d)})`)
        .on('mouseover', this.showTooltip)
        .on('mouseleave', this.hideTooltip)

      if (this.width > 500) {
        this.nodes.on('mousemove', this.moveTooltip)
      }
    },
    appendDefinitions(data = this.data) {
      const defs = this.svg.append('defs')

      defs
        .selectAll('poster-pattern')
        .data(data)
        .enter()
        .append('pattern')
        .attr('class', 'poster-pattern')
        .attr('id', this.defTitle)
        .attr('height', '100%')
        .attr('width', '100%')
        .attr('patternContentUnits', 'objectBoundingBox')
        .append('image')
        .attr('height', 1)
        .attr('width', 1)
        .attr('preserveAspectRatio', 'none')
        .attr('xlink:href', (d) => d.poster.url)
    },
    defTitle(d) {
      return (
        this.attr +
        '-' +
        d.title
          .split(' ')
          .join('-')
          .split("'")
          .join('')
      )
    },
    createSimulation(name, props) {
      switch (name) {
        case 'category': {
          const { xForce, yForce, onTickFn, onEndFn, data } = props

          // the simulation is a collection of forces
          // about where we want our circles to go
          // and how we want out circles to interact
          // STEP 1: get them to the middle
          // STEP 2: don't have them collide!

          this.simulation = d3
            .forceSimulation(data || this.data)
            .force('x', d3.forceX(xForce).strength(0.1))
            .force('y', d3.forceY(yForce).strength(0.1))
            .force(
              'collide',
              d3.forceCollide((d) => this.scale(d.revenue) + 2)
            )
            .on('tick', onTickFn)
            .on('end', onEndFn || this.onEndSimulation)
          break
        }
        case 'timeline': {
        }
      }
    },
    onEndSimulation() {
      this.adjustLabels()
    },
  },
}
