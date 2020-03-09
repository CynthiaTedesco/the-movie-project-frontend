<template>
  <div class="presentation">
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
    <NextPageArrow class="white" target="/we-get-you" />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import RandomMovieBubble from '@/components/RandomMovieBubble.vue'
import NextPageArrow from '@/components/Arrows/NextPageArrow.vue'

export default {
  components: { RandomMovieBubble, NextPageArrow },
  data() {
    return {
      randomMovie: null,
    }
  },
  computed: {
    ...mapGetters(['randomMovies'])
  },
  created() {
    const fn = (i, randomMovies = this.randomMovies) => {
      if (i > 2) {
        i = 0
      }
      this.randomMovie = randomMovies[i++]
      setTimeout(function () { fn(i, randomMovies) }, 1500)
    }

    if (!this.randomMovies) {
      this.$store.dispatch('checkMovies').then(({ randomMovies }) => {
        fn(0, randomMovies)
      })
    } else {
      fn(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';
// .presentation {
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-image: radial-gradient(#d0d0d0 0%, #2b4ab7 5%);
//   background-position: 0 0;
//   background-size: 40px 40px;
//   position: relative;
// }
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
