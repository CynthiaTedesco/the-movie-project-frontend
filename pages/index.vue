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
      :question="page.question"
      v-bind:is="page.component"
    />
    <!-- :order="page.order" -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Vue from "vue";
import Intro from "@/Components/Pages/Intro.vue";
import WeGetYou from "@/pages/we-get-you.vue";
import TopMovies from "@/pages/movies/top-movies.vue";
import Genres from "@/Components/Pages/Genres.vue";
import Universes from "@/Components/Pages/Universes.vue";
import Origins from "@/Components/Pages/Origins.vue";

import Series from "@/Components/Pages/Series.vue";
import Languages from "@/Components/Pages/Languages.vue";
import LeadActorGenders from "@/Components/Pages/LeadActorGenders.vue";
import Budgets from "@/Components/Pages/Budgets.vue";
import LeadActorAges from "@/Components/Pages/LeadActorAges.vue";
import DirectorGenders from "@/Components/Pages/DirectorGenders.vue";
import DirectorAges from "@/Components/Pages/DirectorAges.vue";
// import Restrictions from '@/Components/Pages/Restrictions.vue'
// import Posters from '@/Components/Pages/Posters.vue'
// import Countries from '@/Components/Pages/Countries.vue'
// import Cinematographies from '@/Components/Pages/Cinematographies.vue'

import Results from "@/Components/Pages/Results.vue";
import EventBus from "@/assets/js/eventBus.js";
import MENUITEMS from "@/constants/menuItems.js";

export default {
  name: "index",
  components: {
    Intro,
    WeGetYou,
    TopMovies,
    Genres,
    LeadActorAges,
    Universes,
    Origins,
    Budgets,
    Series,
    Languages,
    LeadActorGenders,
    DirectorGenders,
    DirectorAges,
    // Restrictions,Posters,Countries,Cinematographies,

    Results
  },
  watch: {
    pages(o, n) {
      this.$nextTick(() => {
        if (this.$refs.pages) {
          //add observer to the new ones
          this.$refs.pages.forEach(page => {
            this.observer.observe(page.$el);
          });
        }
      });
    }
  },
  data() {
    return {
      randomMovie: null,
      observer: null,
      pages: [],
      pendingPages: [...MENUITEMS]
    };
  },
  computed: {
    ...mapGetters(["randomMovies"])
  },
  created() {
    const fn = (i, randomMovies = this.randomMovies) => {
      if (i > 2) {
        i = 0;
      }
      this.randomMovie = randomMovies[i++];
      setTimeout(function() {
        fn(i, randomMovies);
      }, 1500);
    };

    if (!this.randomMovies) {
      this.$store.dispatch("checkMovies").then(({ randomMovies }) => {
        fn(0, randomMovies);
      });
    } else {
      fn(0);
    }

    EventBus.$on("scrollToTarget", this.scrollToTarget);
  },
  mounted() {
    this.scrollTrigger();
    this.loadNewPage();
  },
  methods: {
    scrollToTarget(targetKey) {
      const targetElement = this.getTargetElement(targetKey);
      if (targetElement) {
        targetElement.$el.scrollIntoView();
      }
    },
    getTargetElement(targetKey) {
      if (this.$refs[targetKey]) {
        return this.$refs[targetKey];
      }
      const index = this.pages.findIndex(page => page.key === targetKey);
      if (index > -1) {
        const name = `<${this.pages[index].key}>`;
        return this.$refs.pages.find(page => page._name === name);
      }

      return null;
    },
    loadNewPage() {
      const nextPending = this.pendingPages.shift();
      if (nextPending) {
        Vue.set(this.pages, this.pages.length, nextPending);
      }
    },
    scrollTrigger() {
      const options = {
        threshold: 0.6
      };
      this.observer = new IntersectionObserver(this.scrollAndLoad, options);
    },
    scrollAndLoad(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          //TODO check if I need to use this index
          const currentIndex = entry.target.getAttribute("data-index");
          entry.target.scrollIntoView();
          this.loadNewPage();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
