<template>
  <div
    class="everything"
  >
    <Intro
      name="intro"
      :random-movie="randomMovie"
      :class="{ current: current === 'intro' }"
    />
    <WeGetYou
      name="we-get-you"
      ref="we-get-you"
      :class="{ current: current === 'we-get-you' }"
    />

    <TopMovies
      name="top-movies"
      ref="top-movies"
      :class="{ current: current === 'top-movies' }"
    />

    <PageComponent
      ref="inner-page"
      name="inner-page"
      :params="currentInnerPage"
      @reload="reload"
      :class="{ current: current === 'inner-page' }"
    >
      <template v-slot>
        <Bubbles
          ref="bubbles"
          :axis="isAxisChart"
          v-if="groups && groups.length"
          :movies="movies"
          :groups="groups"
          :attr="keyword"
          :singleKeyword="singleKeyword"
          :hasMany="hasMany"
        />
      </template>
    </PageComponent>

    <Results name="results" :class="{ current: current === 'results' }" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Vue from "vue";
import Intro from "@/Components/Pages/Intro.vue";
import WeGetYou from "@/pages/we-get-you.vue";
import TopMovies from "@/pages/movies/top-movies.vue";

import { customKey, clientHeight, scrollY } from "@/assets/js/helpers.js";
import PageComponent from "@/Components/Pages/PageComponent";
import InnerPageDescription from "@/Components/InnerPageDescription";
import Bubbles from "@/Components/Charts/Bubbles";
import bubblePage from "@/mixins/bubblePage.js";

import Results from "@/Components/Pages/Results.vue";
import EventBus from "@/assets/js/eventBus.js";
import MENUITEMS from "@/constants/menuItems.js";

import smoothscroll from 'smoothscroll-polyfill';

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
    isAxisChart() {
      const key = customKey(this.keyword, this.singleKeyword);
      return (
        key === "characters-age" ||
        key === "directors-age" ||
        key === "word_count" ||
        key === "release_date" ||
        key === "length" ||
        key === "budget"
      );
    },
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
  destroyed() {
    window.removeEventListener("wheel", this.onNavigate);
    window.removeEventListener("keyup", this.onNavigateByKeys);
  },
  mounted() {
    smoothscroll.polyfill();
    window.addEventListener("wheel", this.onNavigate, { passive: false });
    window.addEventListener("keyup", this.onNavigateByKeys, { passive: false });

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
          this.scrollToTarget("results");
          break;
        case "inner-page":
          this.scrollToTarget("inner-page");
          if (this.$refs["inner-page"]) {
            this.$refs["inner-page"].loadSpecificPage(innerTarget);
          }
      }
    },
    getNewTop(direction) {
      return scrollY() + clientHeight() * direction;
    },
    setNewCurrent(direction) {
      const current = document.getElementsByClassName("current")[0];
      if (current) {
        const target =
          direction > 0
            ? current.nextElementSibling
            : current.previousElementSibling;
        if (target) {
          this.current = target.getAttribute("name");
        }

        setTimeout(() => {
          this.doing = false;
        }, 350);
      }
    },
    onNavigateByKeys(e) {
      if (e.keyCode === 38) {
        this.onNavigate(e, -1);
      }
      if (e.keyCode === 40) {
        this.onNavigate(e, 1);
      }
    },
    onNavigate(e, direction) {
      if (e) {
        e.preventDefault();
      }

      //if menu is open then ignore
      const menuIsDisplayed = document.querySelector(".menu-content");
      if (menuIsDisplayed) return;

      direction = direction || (e && e.deltaY > 0 ? 1 : -1);

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
