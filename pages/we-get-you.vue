<template>
  <div class="presentation">
    <div v-html="$t('feeling-unispired')"></div>
    <div class="covered">
      {{$t('covered')}}
      <img src="/divider.png" />
    </div>
    <div v-html="description"></div>
    <NextPageArrow class="white" target="movies/top-movies" />
  </div>
</template>

<script>
import NextPageArrow from '@/components/Arrows/NextPageArrow.vue'
export default {
  components: { NextPageArrow },
  transition: 'slide-top',
  computed: {
    description () {
      return `We analyzed the top ${this.$store.getters.movies.length} highest grossing movies,<br/>`+
      'to create the ultimate guide for you <br/>to turn your movie idea into a blockbuster.';
    }
  }
}
</script>

<style lang="scss" scoped>
.presentation {
  flex-direction: column;
  padding: 0 10rem;

  div {
    text-align: center;

    &.covered {
      max-width: 600px;
      font-weight: bolder;
      font-size: 39px;
      margin: 2rem 0 -1px;

      img {
        max-width: 470px;
        margin-top: -3rem;
      }
    }
  }
}
</style>