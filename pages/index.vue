<template>
  <div class="everything" v-touch:swipe.stop="onNavigateBySwipe">
    <Intro
      id="intro"
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

import smoothscroll from "smoothscroll-polyfill";

import Vue2TouchEvents from "vue2-touch-events";

Vue.use(Vue2TouchEvents);

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
    window.removeEventListener("wheel", this.onNavigateByWheel);
    window.removeEventListener("keyup", this.onNavigateByKeys);
  },
  mounted() {
    smoothscroll.polyfill();
    window.addEventListener("wheel", this.onNavigateByWheel, {
      passive: false,
    });
    window.addEventListener("keyup", this.onNavigateByKeys, { passive: false });

    this.checkCurrent();
  },
  methods: {
    checkCurrent(avoidMending) {
      const withinViewport = this.calculateWithinViewport();
      if (withinViewport) {
        const name = withinViewport.getAttribute("name");
        const rect = withinViewport.getBoundingClientRect();

        if (name !== this.current) {
          this.current = name;
        }

        if (!avoidMending && rect.y !== 0 && Math.abs(rect.y) > 50) {
          window.scrollTo({
            top: rect.y,
            behavior: "smooth",
          });
        }
      }
    },
    calculateWithinViewport() {
      if (process.client) {
        const pages = Array.from(
          document.getElementsByClassName("page")
        ).filter((page) => {
          const rect = page.getBoundingClientRect();
          return rect.top <= window.outerHeight / 2;
        });
        if (pages.length === 1) {
          return pages[0];
        } else {
          const pages1 = pages.filter((page) => {
            const rect = page.getBoundingClientRect();
            return Math.abs(rect.top) <= window.outerHeight / 2;
          });
          if (pages1.length === 1) {
            return pages1[0];
          } else {
            return pages1.reduce((min, p) => {
              const top = Math.abs(p.getBoundingClientRect().top);
              return top === 0 || top < min ? p : min;
            });
          }
        }
      }
    },
    runWithDelay(fn) {
      if (!this.doing) {
        this.doing = true;
        const self = this;
        setTimeout(function () {
          fn();
        }, 600);
      }
    },
    onNavigateBySwipe(direction) {
      switch (direction) {
        case "top": {
          this.onNavigate(true);
          break;
        }
        case "bottom": {
          this.onNavigate(false);
          break;
        }
      }
    },
    onNavigateByWheel(e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      this.onNavigate(e.deltaY > 0);
    },
    onNavigateByKeys(e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      if (e.keyCode === 38) {
        this.onNavigate(false);
      }
      if (e.keyCode === 40) {
        this.onNavigate(true);
      }
    },

    onNavigate(down) {
      //if menu is open then ignore
      const menuIsDisplayed = document.querySelector(".menu-content");
      if (menuIsDisplayed) return;

      //if top === 0 then ignore
      if (window.scrollY === 0 && !down) return;

      if (!this.doing) {
        this.checkCurrent(this.current !== 'inner-page');
        if (down) {
          switch (this.current) {
            case "intro":
              this.runWithDelay(() => this.scrollToTarget("we-get-you"));
              break;
            case "we-get-you":
              this.runWithDelay(() => this.scrollToTarget("top-movies"));
              break;
            case "top-movies":
              this.runWithDelay(() => this.scrollToTarget("inner-page"));
              if (this.$refs["inner-page"]) {
                const UniversePage = MENUITEMS.find(
                  (mi) => mi.key === "UniversePage"
                );

                this.$refs["inner-page"].loadSpecificPage(UniversePage);
              }
              break;
            case "inner-page":
              if (this.$refs["inner-page"]) {
                this.runWithDelay(() => this.$refs["inner-page"].loadNext());
              }
              break;
          }
        } else {
          switch (this.current) {
            case "we-get-you":
              this.runWithDelay(() => this.scrollToTarget("intro"));
              break;
            case "top-movies":
              this.runWithDelay(() => this.scrollToTarget("we-get-you"));
              break;
            case "inner-page":
              if (this.$refs["inner-page"]) {
                this.runWithDelay(() =>
                  this.$refs["inner-page"].loadPrevious()
                );
              }
              break;
            case "results":
              this.runWithDelay(() => {
                this.scrollToTarget("inner-page");
                if (this.$refs["inner-page"]) {
                  const posterPage = MENUITEMS.find(
                    (mi) => mi.key === "PosterPage"
                  );

                  this.$refs["inner-page"].loadSpecificPage(posterPage);
                }
              });
          }
        }
      }
    },
    menuClick({ target, innerTarget }) {
      switch (target) {
        case "top-movies":
          this.runWithDelay(() => this.scrollToTarget("top-movies"));
          break;
        case "results":
          this.runWithDelay(() => this.scrollToTarget("results"));
          break;
        case "inner-page":
          this.runWithDelay(() => this.scrollToTarget("inner-page"));
          if (this.$refs["inner-page"]) {
            this.$refs["inner-page"].loadSpecificPage(innerTarget);
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
          this.setDoing(false, this.current, target.key);
        });
      } else {
        this.setDoing(false, this.current, target.key);
      }
    },
    scrollToTarget(targetKey) {
      const targetElement = this.getTargetElement(targetKey);
      const from = this.current;
      if (targetElement) {
        this.current = targetElement.getAttribute("name");
        // if (from === "inner-page" && targetKey === "results") {
        //   const offset = window.innerHeight - window.outerHeight;
        //   window.scrollTo({
        //     top: window.scrollY + window.innerHeight - offset,
        //   });
        // } else {
        //   debugger;
        targetElement.scrollIntoView({ behavior: "smooth" });
        // }
      }
      this.setDoing(false, from, targetKey);
    },
    getTargetElement(targetKey) {
      if (this.$refs[targetKey]) {
        return this.$refs[targetKey].$el;
      }

      return process.client ? document.getElementsByName(targetKey)[0] : null;
    },
    setDoing(isDoing, from, to) {
      if (isDoing) {
        this.doing = isDoing;
      } else {
        let timeout = 400;
        if (from === "results" && to === "PosterPage") {
          timeout = 1000;
        }
        if (from === "inner-page") {
          const targetIsInner =
            to !== "top-movies" &&
            to !== "we-get-you" &&
            to !== "intro" &&
            to !== "results";
          if (targetIsInner) {
            timeout = 600;
          }
        }

        const self = this;
        setTimeout(function () {
          self.doing = isDoing;
        }, timeout);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
