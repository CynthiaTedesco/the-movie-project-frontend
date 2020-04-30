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
      // const fn = () => {
        if (this.$refs.chartContainer) {
          const container = this.$refs.chartContainer.getBoundingClientRect()
          this.width = container.width
          this.height = container.height
        }
      // }

      // fn()
    },
  },
}
