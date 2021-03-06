<template>
  <div class="top-movies page" id="top-movies">
    <TheHeader
      class="negative"
      @menuToggle="displayMenu = !displayMenu"
      :hide-logo="true"
      :hide-menu-toggle="true"
      :title="title"
    />
    <div class="presentation">
      <div v-if="movies" class="bubbles" :class="bubblesClasses">
        <div v-for="movie in movies" :key="movie.id">
          <div class="bubble">
            <img
              :src="movie.poster.url"
              alt="movie-poster"
              :title="movie.title"
              :style="bubbleStyle(movie)"
            />
          </div>
          <div class="title" :title="movie.title">{{ movie.title }}</div>
          <div class="revenue">{{ revenue(movie) }}</div>
        </div>
      </div>
      <NextPageArrow class="white" target="inner-page" />
    </div>
  </div>
</template>

<script>
import TheHeader from "@/Components/Navigation/TheHeader";
import NextPageArrow from "@/Components/Arrows/NextPageArrow.vue";
import { beautifyCashValue, slices } from "@/assets/js/helpers.js";
import { mapGetters } from "vuex";
import filter from "@/mixins/filter.js";

export default {
  // layout: 'innerPage',
  components: { TheHeader, NextPageArrow },
  mixins: [filter],
  data() {
    return {
      movies: [],
      displayMenu: false,
    };
  },
  async beforeMount() {
    const sli = slices();
    this.movies = await this.$store.getters.movies(sli);
  },
  computed: {
    bubblesClasses() {
      return "top-" + this.movies.length + "-movies";
    },
    title() {
      return `The top ${this.movies.length} highest grossing movies`;
    },
  },
  methods: {
    revenue(movie) {
      return beautifyCashValue(movie.revenue);
    },
    bubbleStyle(movie) {
      const size = this.scale(movie.revenue);
      return {
        width: size + "px",
        height: size + "px",
      };
    },
    scale(revenue) {
      const domain = this.movies.map((m) => m.revenue);
      const maxRevenue = this.movies[0].revenue;
      const maxWidth = 60;

      return (revenue * maxWidth) / maxRevenue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

.top-movies {
  position: relative;

  .presentation {
    padding: 100px 0;
    padding-top: 150px;
    height: 100%;
    z-index: 1;

    .bubbles {
      padding: 0 6rem;

      width: 100%;
      height: 100%;
      margin-bottom: -2rem;

      display: grid;
      font-size: 14px;

      @media screen and (max-height: 720px) {
        margin-bottom: 0;
      }

      &.top-30-movies {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(5, 1fr);

        // @include media-breakpoint-down(l) {
        //   grid-template-columns: repeat(5, 1fr);
        //   grid-template-rows: repeat(4, 1fr);
        // }
      }

      &.top-40-movies {
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(5, 1fr);

        // @include media-breakpoint-down(l) {
        //   grid-template-columns: repeat(5, 1fr);
        //   grid-template-rows: repeat(4, 1fr);
        // }
      }
      &.top-50-movies {
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(5, 1fr);

        @include media-breakpoint-down(l) {
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(4, 1fr);
        }
      }

      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(5, 1fr);

      @include media-breakpoint-up(sm) {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 1fr);
      }

      > div {
        background-image: radial-gradient(#d0d0d0 0%, #2b4ab7 5%);
        background-position: 0 0;
        background-size: 40px 40px;
        > div {
          text-align: center;

          &.title {
            font-weight: bold;
            height: 20px;
            width: 40vw;
            white-space: nowrap;
            overflow: hidden;
            margin: auto;
            text-overflow: ellipsis;

            @include media-breakpoint-up(sm) {
              width: 23vw;
            }
            @include media-breakpoint-up(md) {
              width: 17vw;
            }
            @include media-breakpoint-up(lg) {
              width: 8vw;
            }
          }
        }
      }

      .bubble {
        border-radius: 50%;
        height: 70px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;

        @media screen and (max-height: 720px) {
          height: 50px;
        }

        img {
          width: 200%;
          height: 200%;
          border-radius: 50%;
        }
      }

      @include media-breakpoint-down(l) {
        padding: 0 2rem;
      }
    }
  }
  @include media-breakpoint-down(l) {
    /deep/ .location {
      position: relative;
      margin-top: 0.8em;
    }
  }
}
</style>