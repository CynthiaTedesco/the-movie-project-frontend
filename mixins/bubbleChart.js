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
      //   const radius = this.coordinates.revenues.map((revenue) => {
      //     return this.scale(revenue)
      //   })
      this.categoriesNames = [
        ...new Set(
          this.groups.map((group, index) => {
            return index > 4 ? 'others' : group[0].toLowerCase()
          })
        ),
      ]

      this.labels = this.svg.append('g').attr('class', 'labels')
      const radius = [50, 50]
      for (let i = 1; i < Math.min(this.groups.length, 7); i++) {
        let x
        let y
        const spacing = this.isMultiline ? 2 : 1.5
        const textWidth = this.textWidth(this.categoriesNames[i - 1])
        switch (i) {
          case 1: {
            x = this.coordinates.columns[0] - textWidth / 2
            y = this.coordinates.rows[0] + radius[0] * spacing
            break
          }
          case 2: {
            x = this.coordinates.columns[1] - textWidth / 2
            y = this.coordinates.rows[0] + radius[0] * spacing
            break
          }
          case 3: {
            x = this.coordinates.columns[2] - textWidth / 2
            y = this.coordinates.rows[0] + radius[0] * spacing
            break
          }
          case 4: {
            x = this.coordinates.columns[0] - textWidth / 2
            y = this.coordinates.rows[1] + (radius[1] * spacing) / 2
            break
          }
          case 5: {
            x = this.coordinates.columns[1] - textWidth / 2
            y = this.coordinates.rows[1] + (radius[1] * spacing) / 2
            break
          }
          case 6: {
            x = this.coordinates.columns[2] - textWidth / 2
            y = this.coordinates.rows[1] + radius[1] * spacing
            break
          }
        }
        this.labels
          .append('text')
          .attr('x', x)
          .attr('y', y)
          .attr('fill', '#aa9d9c')
          .attr('font-size', '14')
          .text(() => {
            return this.categoriesNames[i - 1]
          })

        if (i === 1) {
          this.labels
            .append('image')
            .attr('href', '/handmade-circle.gif')
            .attr('width', textWidth + 20)
            .attr('height', 34)
            .attr('x', x - 9)
            .attr('y', y - 22)
        }
      }
    },
    adjustLabels() {
      const radius = [50, 50]
      this.labels.selectAll('text').each((text, index, texts) => {
        let x
        let y
        const spacing = this.isMultiline ? 2 : 1.5
        const textWidth = this.textWidth(this.categoriesNames[index])
        switch (index + 1) {
          case 1: {
            x = this.coordinates.columns[0] - textWidth / 2
            y = this.coordinates.rows[0] + radius[0] * spacing
            break
          }
          case 2: {
            x = this.coordinates.columns[1] - textWidth / 2
            y = this.coordinates.rows[0] + radius[0] * spacing
            break
          }
          case 3: {
            x = this.coordinates.columns[2] - textWidth / 2
            y = this.coordinates.rows[0] + radius[0] * spacing
            break
          }
          case 4: {
            x = this.coordinates.columns[0] - textWidth / 2
            y = this.coordinates.rows[1] + (radius[1] * spacing) / 2
            break
          }
          case 5: {
            x = this.coordinates.columns[1] - textWidth / 2
            y = this.coordinates.rows[1] + (radius[1] * spacing) / 2
            break
          }
          case 6: {
            x = this.coordinates.columns[2] - textWidth / 2
            y = this.coordinates.rows[1] + radius[1] * spacing
            break
          }
        }
        d3.select(texts[index])
          .attr('x', x)
          .attr('y', y)

        if (index === 0) {
          this.labels
            .select('image')
            .attr('x', x - 9)
            .attr('y', y - 22)
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
}
