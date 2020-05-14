<template>
  <div class="presentation page">
    <div class="presentation-content" v-if="randomMovie">
      <div class="images">
        <RandomMovieBubble :movie="randomMovie" />
      </div>
      <div class="text">
        <div class="how-to">
          {{ $t('howToMake') }}
          <br />
          {{ $t('aBlockbuster') }}
        </div>
        <div class="step-by-step">{{ $t('stepByStep') }}</div>
      </div>
    </div>
    <NextPageArrow class="white" target="we-get-you" />
  </div>
</template>

<script>
import NextPageArrow from '@/Components/Arrows/NextPageArrow.vue'
import RandomMovieBubble from '@/Components/RandomMovieBubble.vue'

export default {
  components: {
    RandomMovieBubble,
    NextPageArrow
  },
  props: {
    randomMovie: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';
.presentation-content {
  flex-direction: column-reverse;
  display: flex;
  justify-content: space-between;
  background-color: $clear;

  @include media-breakpoint-up(sm) {
    flex-direction: row;
  }

  .images {
    margin-top: 3rem;
    @include media-breakpoint-up(sm) {
      margin-top: 0;
    }
  }
}
.text {
  display: flex;
  flex-direction: column;
  color: white;

  .how-to {
    font-size: 36px;
    font-weight: 900;
    line-height: 1;

    @include media-breakpoint-up(sm) {
      font-size: 50px;
    }
  }

  .step-by-step {
    font-family: 'jeff-script-regular';
    font-size: 30px;
  }
}
</style>