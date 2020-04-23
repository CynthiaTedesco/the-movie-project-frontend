<template>
  <section class="page-container">
    <div class="description"></div>
    <BubblesInGroups v-if="Object.keys(groups).length" :movies="movies" :groups="groups" attr="genres"/>
  </section>
</template>

<script>
import BubbleCloud from "@/components/Charts/BubbleCloud"
import BubblesInGroups from "@/components/Charts/BubblesInGroups"

export default {
  layout: 'innerPage',
  components: {
    BubbleCloud,
    BubblesInGroups
  },
  data() {
    return {
      movies: [],
      groups: {}
    }
  },
  async mounted() {
    await this.$store.dispatch('checkGenres')
    this.movies = await this.$store.getters.movies
    this.groups = this.groupBy(this.movies, 'genres');
  },
  methods: {
    groupBy(xs, key) {
      return xs.reduce(function (rv, x) {
        const innerKey = x[key].find(a=>a.primary).genre_name;
        (rv[innerKey] = rv[innerKey] || []).push(x)
        return rv
      }, {})
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';
  
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: $black;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: $black;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.test-button {
  animation: rotating 1.7s linear infinite;
}
</style>
