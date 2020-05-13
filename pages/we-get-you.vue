<template>
  <div id="we-get-you" class="presentation page">
    <div v-html="$t('feeling-unispired')"></div>
    <div class="covered">
      {{$t('covered')}}
      <img src="/divider.png" />
    </div>
    <div v-html="description"></div>
    <NextPageArrow class="white" :target="nextView" />
  </div>
</template>

<script>
import NextPageArrow from '@/Components/Arrows/NextPageArrow.vue'
export default {
  components: { NextPageArrow },
  data(){
    return{
      nextView: 'top-movies'
    }
  },
  transition: 'slide-top',
  computed: {
    description () {
      return `We analyzed the top ${this.$store.getters.movies.length} highest grossing movies,<br/>` +
        'to create the ultimate guide for you <br/>to turn your movie idea into a blockbuster.';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';

.presentation {
  flex-direction: column;
  padding: 0 0.9rem;

  @include media-breakpoint-up(sm) {
    padding: 0 9rem;
  }

  div {
    text-align: center;

    &.covered {
      max-width: 600px;
      font-weight: bolder;
      font-size: 39px;
      margin: 2rem 0 -1px;

      img {
        width: 13em;
        max-width: 80vw;
        margin-top: -3rem;
      }
    }
  }
}
</style>