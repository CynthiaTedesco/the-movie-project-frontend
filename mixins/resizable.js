export default {
  data() {
    return {
      display: 'large', //[small (<1024), large]
    }
  },
  beforeMount() {
    this.display = this.calculateDisplay()
  },
  mounted() {
    window.addEventListener('resize', this.eventListenerFn)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resized)
  },
  methods: {
    eventListenerFn() {
      clearTimeout(this.doit)
      this.doit = setTimeout(this.resized, 300)
    },
    calculateDisplay() {
      const width = document.documentElement.clientWidth
      if (width < 1024) {
        return 'small'
      }

      return 'large'
    },
    resized() {
      this.display = this.calculateDisplay()
      //   this.setDimensions()
    //   const newDisplay = this.calculateDisplay()
    //   if (newDisplay !== this.display) {
    //     this.display = newDisplay
        // this.$nextTick(() => {
        //   this.draw()
        // })
    //   }
    },
  },
}
