const d3 = require('d3')

export default {
  data() {
    return {
      tooltip: null,
    }
  },
  mounted() {
    this.tooltip = d3
      .select('.chart-container')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', '#2b49b9')
      .style('padding', '10px')
      .style('color', 'white')
  },
  methods: {
    showTooltip(d, index, circles) {
      const origin = circles[index]
      const estimatedWidth = this.textWidth(d.title)
      const html = `<strong>${d.title}</strong><br/>${d.category.name}`

      this.tooltip.transition().duration(200)
      this.tooltip
        .style('opacity', 1)
        .style('min-width', estimatedWidth + 30 + 'px')
        .style('top', d3.mouse(origin)[1] + 20 + 'px')
        .html(html)

      const left = d3.mouse(origin)[0] + 30
      if (left + estimatedWidth > this.width) {
        this.tooltip.style('right', '100px').style('left', 'unset')
      } else {
        this.tooltip.style('left', left + 'px').style('right', 'unset')
      }
    },
    moveTooltip(d, index, circles) {
      const origin = circles[index]
      const estimatedWidth = this.textWidth(d.title)
      const left = d3.mouse(origin)[0] + 30

      this.tooltip.style('top', d3.mouse(origin)[1] + 20 + 'px')

      if (left + estimatedWidth + 40 > this.width) {
        this.tooltip.style('left', 'unset').style('right', '100px')
      } else {
        this.tooltip.style('left', left + 'px').style('right', 'unset')
      }
    },
    hideTooltip(d) {
      this.tooltip
        .transition()
        .duration(200)
        .style('opacity', 0)
    },
  },
}
