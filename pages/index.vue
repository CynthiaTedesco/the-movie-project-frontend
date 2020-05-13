<template>
  <div class="everything">
    <Intro :random-movie="randomMovie" />
    <WeGetYou ref="we-get-you" />
    <TopMovies ref="top-movies" />
    <component
      ref="pages"
      v-for="page in pages"
      :key="page.key"
      v-bind:is="page.component"
      :order="page.order"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Intro from '@/Components/Pages/Intro.vue'
import WeGetYou from '@/pages/we-get-you.vue'
import TopMovies from '@/pages/movies/top-movies.vue'
import Genres from '@/Components/Pages/Genres.vue'
import SettingTime from '@/pages/story/settingTime.vue'

export default {
  name: 'index',
  components: {
    Intro,
    WeGetYou,
    TopMovies,
    Genres,
    SettingTime
  },
  data () {
    return {
      randomMovie: null,
      pages: [],
      pendingPages: [
        { order: 0, key: 'genres', component: Genres },
        { order: 1, key: 'genres', component: Genres },
        { order: 2, key: 'genres', component: Genres }
      ]
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

    this.loadNewPage();
  },
  methods: {
    getTarget (targetKey) {
      if (this.$refs[targetKey]) {
        return this.$refs[targetKey];
      }
      const index = this.pages.findIndex(page => page.key === targetKey);
      if (index > -1) {
        return this.$refs.pages[index];
      }

      return null;
    },
    loadNewPage () {
      const nextPending = this.pendingPages.slice(0, 1).shift();
      this.pages.push(nextPending);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
