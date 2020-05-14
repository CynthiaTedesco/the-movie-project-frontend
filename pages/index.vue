<template>
  <div class="everything">
    <Intro :random-movie="randomMovie" />
    <WeGetYou ref="we-get-you" />
    <TopMovies ref="top-movies" />
    <component
      ref="pages"
      v-for="(page, i) in pages"
      :key="page.key"
      :data-index="i"
      v-bind:is="page.component"
      :order="page.order"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Vue from 'vue'
import Intro from '@/Components/Pages/Intro.vue'
import WeGetYou from '@/pages/we-get-you.vue'
import TopMovies from '@/pages/movies/top-movies.vue'
import Genres from '@/Components/Pages/Genres.vue'
import Universes from '@/Components/Pages/Universes.vue'
import Origins from '@/Components/Pages/Origins.vue'
import Results from '@/Components/Pages/Results.vue'
import EventBus from '@/assets/js/eventBus.js';

export default {
  name: 'index',
  components: {
    Intro,
    WeGetYou,
    TopMovies,
    Genres,
    Universes,
    Origins,
    Results
  },
  watch: {
    pages (o, n) {
      this.$nextTick(() => {

        //add observer to the new ones
        this.$refs.pages.forEach(page => {
          this.observer.observe(page.$el);
        });
      });
    }
  },
  data () {
    return {
      randomMovie: null,
      observer: null,
      pages: [],
      pendingPages: [
        // { order: 0, key: 'universe', component: Universes },
        { order: 1, key: 'genres', component: Genres },
        { order: 2, key: 'origins', component: Origins },
        { order: 19, key: 'results', component: Results },
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

    EventBus.$on('scrollToTarget', this.scrollToTarget);
  },
  mounted () {
    this.scrollTrigger();
    this.loadNewPage();
  },
  methods: {
    scrollToTarget (targetKey) {
      const targetElement = this.getTargetElement(targetKey);
      if (targetElement) {
        targetElement.$el.scrollIntoView();
      }
    },
    getTargetElement (targetKey) {
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
      const nextPending = this.pendingPages.shift();
      if (nextPending) {
        Vue.set(this.pages, this.pages.length, nextPending);
      }
    },
    scrollTrigger () {
      const options = {
        threshold: 0.1
      }
      this.observer = new IntersectionObserver(this.scrollAndLoad, options);
    },
    scrollAndLoad (entries) {
      entries.forEach(entry => {
        console.log(entry);
        if (entry.isIntersecting) {
          const currentIndex = entry.target.getAttribute('data-index');

          this.loadNewPage();
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
