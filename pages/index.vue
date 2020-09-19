<template>
  <div class="everything">
    <Intro name="intro" :random-movie="randomMovie" :class="{'current': current === 'intro'}" />
    <WeGetYou name="we-get-you" ref="we-get-you" :class="{'current': current === 'we-get-you'}" />

    <TopMovies name="top-movies" ref="top-movies" :class="{'current': current === 'top-movies'}" />

    <PageComponent
      ref="inner-page"
      name="inner-page"
      :params="currentInnerPage"
      @reload="reload"
      :class="{'current': current === 'inner-page'}"
    >
      <template v-slot>
        <Bubbles
          ref="bubbles"
          v-if="groups && groups.length"
          :movies="movies"
          :groups="groups"
          :attr="keyword"
          :singleKeyword="singleKeyword"
          :hasMany="hasMany"
        />
        <!-- </section> -->
      </template>
    </PageComponent>

    <Results name="results" :class="{'current': current === 'results'}" />
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
import DistributionCompanies from "@/Components/Pages/DistributionCompanies.vue";
import Restrictions from "@/Components/Pages/Restrictions.vue";
import Posters from "@/Components/Pages/Posters.vue";
import Lengths from "@/Components/Pages/Lengths.vue";
import Words from "@/Components/Pages/Words.vue";
import Months from "@/Components/Pages/Months.vue";
import Countries from "@/Components/Pages/Countries.vue";
import Cinematographies from "@/Components/Pages/Cinematographies.vue";

import { customKey, clientHeight, scrollY } from "@/assets/js/helpers.js";
import PageComponent from "@/Components/Pages/PageComponent2";
import InnerPageDescription from "@/Components/InnerPageDescription";
import Bubbles from "@/Components/Charts/Bubbles";
import bubblePage from "@/mixins/bubblePage.js";

import Results from "@/Components/Pages/Results.vue";
import EventBus from "@/assets/js/eventBus.js";
import MENUITEMS from "@/constants/menuItems.js";

export default {
  name: "index",
  mixins: [bubblePage],
  components: {
    PageComponent,
    InnerPageDescription,
    Bubbles,
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
    Countries,
    Words,
    Months,
    DistributionCompanies,
    Restrictions,
    Posters,
    Lengths,
    Cinematographies,
    Results,
  },
  watch: {},
  data() {
    return {
      doing: false,
      current: "intro",
      currentInnerPageKey: "UniversePage",
      movies: [],
      groups: {},
      keyword: "universe", //used in mixin,
      singleKeyword: "",
      hasMany: false,

      randomMovie: null,
      observer: null,
      pages: [],
      pendingPages: [...MENUITEMS],
      timer: null,
    };
  },
  computed: {
    currentInnerPage() {
      return MENUITEMS.find((mi) => mi.key === this.currentInnerPageKey);
    },
    ...mapGetters(["randomMovies"]),
    ...mapGetters(["allGroups"]),
  },
  created() {
    const fn = (i, randomMovies = this.randomMovies) => {
      if (i > 2) {
        i = 0;
      }
      this.randomMovie = randomMovies[i++];
      setTimeout(function () {
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
    EventBus.$on("menuClick", this.menuClick);
  },
  mounted() {
    window.addEventListener("wheel", this.onWheel, { passive: false });
    const withinViewport = Array.from(
      document.getElementsByClassName("page")
    ).filter((page) => page.getBoundingClientRect().top >= 0)[0];
    if (withinViewport) {
      const name = withinViewport.getAttribute("name");
      if (name !== this.current) {
        const rect = withinViewport.getBoundingClientRect();
        this.current = name;
        if (rect.y !== 0) {
          window.scrollTo({
            top: rect.y,
            behavior: "smooth",
          });
        }
      }
    }
  },
  methods: {
    menuClick({ target, innerTarget }) {
      switch (target) {
        case "top-movies":
          this.scrollToTarget("top-movies");
          break;
        case "results":
          this.scrollToTarget('results');
          break;
        case "inner-page":
          this.scrollToTarget('inner-page');
          if(this.$refs['inner-page']){
            this.$refs['inner-page'].loadSpecificPage(innerTarget);
          }
      }
    },
    getNewTop(direction) {
      return scrollY() + clientHeight() * direction;
    },
    setNewCurrent(direction) {
      console.log("setting new current");

      const current = document.getElementsByClassName("current")[0];
      if (current) {
        const target =
          direction > 0
            ? current.nextElementSibling
            : current.previousElementSibling;
        console.log("moving from", current, "to", target);
        if (target) {
          this.current = target.getAttribute("name");
        }

        setTimeout(() => {
          console.log("setting doing to false");
          this.doing = false;
        }, 350);
      }
    },
    onWheel(e) {
      e.preventDefault();

      //if menu is open then ignore
      const menuIsDisplayed = document.querySelector(".menu-content");
      if (menuIsDisplayed) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      if (!this.doing) {
        this.doing = true;
        const self = this;

        if (self.current === "inner-page") {
          if (self.$refs[self.current]) {
            if (self.timer) {
              clearTimeout(self.timer);
            }
            this.timer = setTimeout(function () {
              if (direction > 0) {
                self.$refs[self.current].loadNext();
              } else {
                self.$refs[self.current].loadPrevious();
              }
            }, 200);
          }
        } else {
          window.requestAnimationFrame(function () {
            window.scrollTo({
              top: self.getNewTop(direction),
              behavior: "smooth",
            });

            self.setNewCurrent(direction);
          });
        }
      }
    },
    reload(target) {
      this.keyword = target.keyword;
      this.singleKeyword = target.singleKeyword;
      const key = customKey(target.keyword, target.singleKeyword);

      this.currentInnerPageKey = target.key;
      this.hasMany = target.hasMany;
      this.movies = this.$store.getters.movies();
      this.groups = this.allGroups[key];
      if (!this.groups) {
        const self = this;
        this.$store.dispatch("setSpecificResults", key).then((groups) => {
          self.groups = groups;
          self.doing = false;
        });
      } else {
        this.doing = false;
      }

    },
    scrollToTarget(targetKey) {
      const targetElement = this.getTargetElement(targetKey);
      if (targetElement) {
        this.current = targetElement.getAttribute("name");
        targetElement.scrollIntoView();
      }
      this.doing = false;
    },
    getTargetElement(targetKey) {
      if (this.$refs[targetKey]) {
        return this.$refs[targetKey].$el;
      }

      return document.getElementsByName(targetKey)[0];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
