<template>
  <div class="presentation">
    <div v-html="$t('feeling-unispired')"></div>
    <div class="covered">
      {{$t('covered')}}
      <img src="/divider.png" />
    </div>
    <div v-html="$t('description')"></div>
    <NextPageArrow class="white" target="/topMovies" />
  </div>
</template>

<script>
import NextPageArrow from '@/components/Arrows/NextPageArrow.vue'
export default {
  components: { NextPageArrow },
  transition: 'slide-top'
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