import { slices } from '@/assets/js/helpers.js'

export default {
  mounted() {
    window.addEventListener('resize', this.checkMovieSlices)
  },
  methods: {
    async checkMovieSlices() {
      if (slices() !== this.movies.length) {
        this.movies = await this.$store.getters.movies(slices())
      }
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.checkMovieSlices)
  },
}
