<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script>
import dimensionable from '@/mixins/dimensionable.js';
import bubbleChartContainer from '@/mixins/bubbleChartContainer.js';
import bubbleChart from '@/mixins/bubbleChart.js';
const d3 = require('d3');

export default {
  data () {
    return {
      doit: null,
    }
  },
  mixins: [dimensionable, bubbleChartContainer, bubbleChart],
  mounted () {
    this.$nextTick(() => {
      this.setDimensions();
      d3.select("svg").remove();

      this.draw();
    });
  },
  computed: {
    yScale () {
      const yScale = d3.scaleOrdinal()
      if (this.isMultiline) {
        yScale.domain([1, 2, 3, 4, 5, 6]).range([0, 0, 0, 50, 50, 50]) //percentages
      } else {
        yScale.domain([1, 2, 3]).range([50, 50, 50]) //percentages
      }
      return yScale;
    },
    xScale () {
      return d3
        .scaleOrdinal()
        .domain([1, 2, 3, 4, 5, 6])
        .range([5, 55, 85, 5, 55, 85]) //percentages
    },
  },
  methods: {
    draw () {
      const props = {
        xForce: this.xForce,
        yForce: this.yForce,
        onTickFn: this.ticked
      };
      this.createSimulation('category', props);
      this.appendSvg();
      this.appendDefinitions();
      this.appendCircles();
    },
    xForce (d) {
      if (!this.coordinates[d.category[this.attr].name]) {
        this.coordinates[d.category.name] = {
          revenue: d.revenue,
          movieId: d.id
        }
      }

      let x;
      const container = this.$refs.chartContainer.getBoundingClientRect()
      const percentage = this.xScale(
        d.category.position <= 6 ? d.category[this.attr].position : 6
      )

      const xPerPercentage = (percentage * container.width) / 100
      if (percentage < 20) {
        x = Math.max(170, xPerPercentage)
      } else if (percentage > 50) {
        x = Math.min(container.width - 100, xPerPercentage)
      }

      this.coordinates[d.category[this.attr].name].x = x;

      //no examples for this case
      return x || container.width / 2;
    },
    yForce (d) {
      if (!this.coordinates[d.category[this.attr].name]) {
        this.coordinates[d.category.name] = {
          revenue: d.revenue,
          movieId: d.id
        }
      }

      const percentage = this.yScale(
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

      this.coordinates[d.category.name].y = y;
      return y
    },
    ticked () {
      const self = this;
      this.nodes.attr('cx', (d) => d.x)
      this.nodes.attr('cy', (d) => {
        if(d.y > self.coordinates[d.category[this.attr].name].y){
          self.coordinates[d.category[this.attr].name].y = d.y;
          self.coordinates[d.category[this.attr].name].revenue = d.revenue;
          self.coordinates[d.category[this.attr].name].movieId = d.id;
        } else if(d.id === self.coordinates[d.category[this.attr].name].movieId){
          self.coordinates[d.category[this.attr].name].y = d.y;
        }
        return d.y
      })
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
        const spacing = this.isMultiline ? 50 : 30
        const textWidth = this.textWidth(this.categoriesNames[i - 1])

        const coordinates =
          i === 5
            ? this.othersMaxCoordinates
            : this.coordinates[this.groups[i][0]]
        xx = coordinates.x
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
      this.labels.selectAll('text').each((text, index, texts) => {
        let xx
        let yy
        const spacing = this.isMultiline ? 30 : 30
        const textWidth = this.textWidth(this.categoriesNames[index])

        const coordinates =
          index === texts.length - 1
            ? this.othersMaxCoordinates
            : this.coordinates[this.groups[index][0]]
        xx = coordinates.x
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
  }
}
</script>

<style lang="scss" scoped>
</style>