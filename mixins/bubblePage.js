import tooltip from '@/mixins/tooltip.js'

export default {
  mixins: [tooltip],
  data() {
    return {
      movies: [],
      groups: {},
      svg: null,
      nodes: null,
    }
  },
  async beforeMount() {
    await this.$store.dispatch('checkGenres')
    this.movies = await this.$store.getters.movies
    // this.groups = this.groupBy(this.movies, 'genres');
  },
}
