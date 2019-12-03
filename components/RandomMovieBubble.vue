<template>
  <div v-if="movie">
    <img :src="movie.poster" alt="movie-poster" />
  </div>
</template>

<script>
export default {
  computed: {
    movie() {
      return this.$store.getters.randomMovie;
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  border-radius: 50%;
  height: 200px;
  width: 200px;
}
</style>
