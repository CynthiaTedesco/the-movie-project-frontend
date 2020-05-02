const d3 = require('d3')

export default {
  data() {
    return {
      tooltip: null,
    }
  },
  mounted() {
    this.tooltip = d3
      .select('#my_dataviz')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'black')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('color', 'white')
  },
}
