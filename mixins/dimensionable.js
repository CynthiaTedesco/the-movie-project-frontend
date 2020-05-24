const d3 = require('d3')
import { isMobile } from '@/assets/js/helpers.js'

export default {
  data() {
    return {
      width: 0,
      height: 0,
      maxCYs: [0, 0],
      coordinates: {},
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

        //container does not resized itself if it already contains a fixed sized svg inside!
        this.width = Math.min(container.width, document.body.clientWidth)
        this.height = container.height
      }

      //if is hidden and we are in a mobile view
      //then we force dimensions to be the same as its container
      if (!this.width || !this.height) {
        if (isMobile() && this.$parent.$refs.inner) {
          const container = this.$parent.$refs.inner.getBoundingClientRect()
          this.width = container.width
          this.height = container.height
        }
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
