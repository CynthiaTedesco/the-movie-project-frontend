<template>
  <section class="container">
      <bubble-cloud class="genre" />
  </section>
</template>

<script lang="ts">
import BubbleCloud from '@/components/BubbleCloud.vue';

export default {
  layout: 'innerPage',
  components: {
    BubbleCloud
  },
  data(){
    return{
      movies: []
    }
  },
  async mounted(){
    await this.$store.dispatch('checkGenres');
    this.movies = await this.$store.getters.movies;
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: $white;
}

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
