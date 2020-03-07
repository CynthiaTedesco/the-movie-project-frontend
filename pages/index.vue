<template>
  <div class="presentation">
    <div class="presentation-content">
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
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import RandomMovieBubble from '@/components/RandomMovieBubble.vue'

export default {
  components: { RandomMovieBubble },
  data() {
    return {
      randomMovie: null,
    }
  },
  computed: {
    ...mapGetters(['randomMovies'])
  },
  created() {
    const fn = (i) => {
      if (i > 2) {
        i = 0
      }
      console.log('fn!', i, new Date())
      this.randomMovie = this.randomMovies[i++]
      setTimeout(function() { fn(i) }, 2000)
    }

    if (!this.randomMovies) {
      this.$store.dispatch('checkMovies').then(() => {
        fn(0)
      })
    } else {
      fn(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';
.presentation {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(#d0d0d0 0%, #2b4ab7 5%);
  background-position: 0 0;
  background-size: 40px 40px;
}
.presentation-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: $clear;
}
.text {
  display: flex;
  flex-direction: column;
  color: white;

  .how-to {
    font-size: 50px;
    font-weight: 900;
    line-height: 1;
  }

  .step-by-step {
    font-family: 'jeff-script-regular';
    font-size: 30px;
  }
}
</style>
