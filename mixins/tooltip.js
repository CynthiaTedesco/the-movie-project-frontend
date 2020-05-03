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
      .style('background-color', 'black')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('color', 'white')
  },
  methods: {
    showTooltip(d, index, circles) {
      const origin = circles[index]
      this.tooltip.transition().duration(200)
      this.tooltip
        .style('opacity', 1)
        .html('Country: ' + d.title)
        .style('left', d3.mouse(origin)[0] + 30 + 'px')
        .style('top', d3.mouse(origin)[1] + 30 + 'px')
    },
    moveTooltip(d, index, circles) {
      const origin = circles[index]
      this.tooltip
        .style('left', d3.mouse(origin)[0] + 30 + 'px')
        .style('top', d3.mouse(origin)[1] + 30 + 'px')
    },
    hideTooltip(d) {
      this.tooltip
        .transition()
        .duration(200)
        .style('opacity', 0)
    },
  },
}
