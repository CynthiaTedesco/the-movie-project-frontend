const d3 = require('d3')
import tooltip from '@/mixins/tooltip.js'

export default {
  mixins: [tooltip],
  data() {
    return {
      svg: null,
      nodes: null,
      categoriesNames: [],
    }
  },
  props: {
    movies: Array,
  },
  watch: {
    nodes(a, b) {
      this.$nextTick(() => {
        setTimeout(this.setLabels, 1000)
      })
      console.log('updated nodes!', a, b)
    },
  },
  computed: {
    scale() {
      return d3
        .scaleLinear()
        .domain([0, this.max])
        .range([10, 50])
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
        .selectAll('.poster-pattern')
        .data(data)
        .enter()
        .append('pattern')
        .attr('class', '.poster-pattern')
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
      return d.title
        .split(' ')
        .join('-')
        .split("'")
        .join('')
    },
    setLabels() {
      this.categoriesNames = [
        ...new Set(
          this.groups.map((group, index) => {
            return index > 4 ? 'others' : group[0].toLowerCase()
          })
        ),
      ]

      this.labels = this.svg.append('g').attr('class', 'labels')

      for (let i = 0; i < Math.min(this.groups.length, 6); i++) {
        let xx
        let yy
        const spacing = this.isMultiline ? 30 : 20
        const textWidth = this.textWidth(this.categoriesNames[i - 1])

        const coordinates =
          i === 5
            ? this.othersMaxCoordinates
            : this.coordinates[this.groups[i][0]]
        xx = coordinates.x // - textWidth / 2
        yy = coordinates.y + this.scale(coordinates.revenue) + spacing

        this.labels
          .append('text')
          .attr('x', xx)
          .attr('y', yy)
          .attr('fill', '#aa9d9c')
          .attr('font-size', '14')
          .text(() => {
            return this.categoriesNames[i]
          })

        if (i === 0) {
          this.labels
            .append('image')
            .attr('href', '/handmade-circle.gif')
            .attr('width', textWidth + 20)
            .attr('height', 34)
            .attr('x', xx - 25)
            .attr('y', yy - 22)
        }
      }
    },
    adjustLabels() {
      console.log('ADJUSTING!')
      this.labels.selectAll('text').each((text, index, texts) => {
        let xx
        let yy
        const spacing = this.isMultiline ? 30 : 30
        const textWidth = this.textWidth(this.categoriesNames[index])

        const coordinates =
          index === texts.length - 1
            ? this.othersMaxCoordinates
            : this.coordinates[this.groups[index][0]]
        xx = coordinates.x // - textWidth / 2
        yy = coordinates.y + this.scale(coordinates.revenue) + spacing

        d3.select(texts[index])
          .attr('x', xx)
          .attr('y', yy)

        if (index === 0) {
          this.labels
            .select('image')
            .attr('x', xx - 25)
            .attr('y', yy - 22)
        }
      })
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

          const simulation = d3
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
        case 'divided-timeline': {
        }
      }
    },
    onEndSimulation() {
      this.adjustLabels()
    },
  },
  //   beforeDestroy() {
  //     d3.select(this.selector || '.chart-container').remove()
  //   },
}
