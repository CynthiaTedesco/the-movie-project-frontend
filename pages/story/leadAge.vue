<template>
  <section class="page-container">
    <div class="description">
      <div class="counter">1/20</div>
      <div class="title">Which genre should your movie be?</div>
      <div class="text">You cannot go wrong with a good old action movie</div>
      <div class="share">Share</div>
    </div>
    <Bubbles v-if="Object.keys(groups).length" :movies="movies" :groups="groups" attr="genres" />
  </section>
</template>

<script>
import Bubbles from "@/Components/Charts/Bubbles";

export default {
  layout: "innerPage",
  components: {
    Bubbles
  },
  data() {
    return {
      movies: [],
      groups: {}
    };
  },
  async mounted() {
    await this.$store.dispatch("checkGenres");
    this.movies = await this.$store.getters.movies;
    this.groups = this.groupBy(this.movies, "genres");
  },
  methods: {
    groupBy(xs, key) {
      return xs.reduce(function(rv, x) {
        const innerKey = x[key].find(a => a.primary || a.main).genre_name;
        (rv[innerKey] = rv[innerKey] || []).push(x);
        return rv;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/common.scss";
.description {
  background: transparent;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 10px;
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
</style>
