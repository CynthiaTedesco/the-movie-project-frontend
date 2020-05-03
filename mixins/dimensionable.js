const d3 = require('d3')

export default {
  data() {
    return {
      width: 0,
      height: 0,
      maxCYs: [0, 0],
      coordinates: {
        columns: [0, 0, 0],
        rows: [0, 0],
        revenues: [0, 0], //revenues of the referenced circles (maxY)
      },
    }
  },
  methods: {
    setDimensions() {
      if (this.$refs.chartContainer || this.selector) {
        const container = this.$refs.chartContainer
          ? this.$refs.chartContainer.getBoundingClientRect()
          : d3
              .select(this.selector)
              .node()
              .getBoundingClientRect()

        this.width = container.width
        this.height = container.height
      }
    },
    textWidth(text, fontSize = 14) {
      const temp = document.createElement('div')
      temp.style.position = 'absolute'
      temp.innerHTML = text
      temp.setAttribute('type', 'hidden')
      temp.style.fontSize = fontSize
      document.body.appendChild(temp)
      const width = temp.clientWidth + 1

      temp.parentNode.removeChild(temp)

      return width
    },
  },
}
