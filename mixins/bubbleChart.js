const d3 = require('d3')
import tooltip from '@/mixins/tooltip.js'

export default {
  mixins: [tooltip],
  data() {
    return {
      data: [],
      svg: null,
      nodes: null,
    }
  },
  props: {
    movies: Array,
    groups: Array,
    attr: String,
    hasMany: Boolean,
  },
  beforeMount() {
    if (this.movies) {
      this.data = this.movies.map((m) => {
        if (this.hasMany) {
          const primary = m[this.attr].find((a) => a.primary)
          m.category = {
            name: primary[this.innerNameKey],
            position:
              this.groups.findIndex(
                (s) => s[0] === primary[this.innerNameKey]
              ) + 1,
          }
        } else {
          m.category = {
            name: m[this.attr][this.innerNameKey],
            position:
              this.groups.findIndex(
                (s) => s[0] === m[this.attr][this.innerNameKey]
              ) + 1,
          }
        }
        return m
      })
    }
  },
  computed: {
    scale() {
      return d3
        .scaleLinear()
        .domain([0, this.max])
        .range([10, 50])
    },
    innerNameKey() {
      if (this.hasMany) {
        const singleName = this.attr.slice(0, -1)
        return `${singleName}_name`
      }

      return 'name'
    },
    isMultiline() {
      return this.groups.length > 3
    },
    max() {
      return Math.max.apply(
        Math,
        this.movies.map((d) => d.revenue)
      )
    },
  },
  methods: {
    appendSvg() {
      this.svg = d3
        .select('.chart-container')
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
        .attr('fill', (d) => `url(#${this.defTitle(d)})`)
        .on('mouseover', this.showTooltip)
        .on('mousemove', this.moveTooltip)
        .on('mouseleave', this.hideTooltip)
    },
    appendDefinitions() {
      const defs = this.svg.append('defs')

      defs
        .selectAll('.poster-pattern')
        .data(this.data)
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
      //TODO FIX!
      const radius = this.coordinates.revenues.map((revenue) => {
        return this.scale(revenue)
      })
      const names = this.groups.map((group, index) => {
        return index > 4 ? 'others' : group[0].toLowerCase()
      })

      this.labels = this.svg.append('g').attr('class', 'labels')

      for (let i = 1; i < this.groups.length; i++) {
        let x
        let y
        const spacing = this.isMultiline ? 2 : 1.5
        const textWidth = this.textWidth(names[i - 1])
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
            return names[i - 1]
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
    createSimulation(name) {
      switch (name) {
        case 'category': {
          const xScale = d3
            .scaleOrdinal()
            .domain([1, 2, 3, 4, 5, 6])
            .range([5, 55, 85, 5, 55, 85]) //percentages
          const yScale = d3.scaleOrdinal()
          if (this.isMultiline) {
            yScale.domain([1, 2, 3, 4, 5, 6]).range([0, 0, 0, 50, 50, 50]) //percentages
          } else {
            yScale.domain([1, 2, 3]).range([50, 50, 50]) //percentages
          }

          const forceX = (d) => {
            const container = this.$refs.chartContainer.getBoundingClientRect()
            const percentage = xScale(
              d.category.position <= 6 ? d.category.position : 6
            )

            const xPerPercentage = (percentage * container.width) / 100
            if (percentage < 20) {
              const x = Math.max(170, xPerPercentage)
              if (this.coordinates.columns[0] === 0) {
                this.coordinates.columns[0] = x
              }
              return x
            } else if (percentage > 50) {
              const x = Math.min(container.width - 100, xPerPercentage)

              if (percentage > 80) {
                if (this.coordinates.columns[2] === 0) {
                  this.coordinates.columns[2] = x
                }
              } else {
                if (this.coordinates.columns[1] === 0) {
                  this.coordinates.columns[1] = x
                }
              }

              return x
            }
          }
          const forceY = (d) => {
            const percentage = yScale(
              d.category.position <= 6 ? d.category.position : 6
            )
            const container = this.$refs.chartContainer.getBoundingClientRect()
            let y
            if (this.isMultiline) {
              if (percentage === 0) {
                y = 140
              } else {
                y = Math.min(700, (75 * container.height) / 100)
              }
            } else {
              y = Math.min(300, container.height / 2)
            }

            return y
          }
          // the simulation is a collection of forces
          // about where we want our circles to go
          // and how we want out circles to interact
          // STEP 1: get them to the middle
          // STEP 2: don't have them collide!
          const simulation = d3
            .forceSimulation(this.data)
            .force('x', d3.forceX(forceX).strength(0.1))
            .force('y', d3.forceY(forceY).strength(0.1))
            .force(
              'collide',
              d3.forceCollide((d) => this.scale(d.revenue) + 2)
            )
            .on('tick', this.ticked)
            // .on('end', this.setLabels)
          break
        }
        case 'timeline': {
        }
        case 'divided-timeline': {
        }
      }
    },
  },
}
