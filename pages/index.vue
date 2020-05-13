<template>
  <div class="everything">
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
      <NextPageArrow class="white" :target="nextView" />
    </div>
    <WeGetYou ref="we-get-you" />
    <TopMovies ref="top-movies" />
    <Genres />
    <!-- <component v-for="page in pages" :key="page.key" v-bind:is="page.component"/> -->
    <!-- <Genre ref="genre" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RandomMovieBubble from '@/Components/RandomMovieBubble.vue'
import NextPageArrow from '@/Components/Arrows/NextPageArrow.vue'
import WeGetYou from '@/pages/we-get-you.vue'
import TopMovies from '@/pages/movies/top-movies.vue'
import Genres from '@/Components/Pages/Genres.vue'
import SettingTime from '@/pages/story/settingTime.vue'

export default {
  components: {
    RandomMovieBubble,
    NextPageArrow,
    TopMovies,
    WeGetYou,
    Genres,
    SettingTime
  },
  data () {
    return {
      randomMovie: null,
      nextView: 'we-get-you',
      pages: []
    }
  },
  computed: {
    ...mapGetters(['randomMovies'])
  },
  created () {
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
