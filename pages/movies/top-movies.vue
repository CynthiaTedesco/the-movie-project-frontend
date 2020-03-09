<template>
  <div class="top-movies">
    <TheHeader
      @menuToggle="displayMenu =!displayMenu"
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
          <div class="title">{{movie.title}}</div>
          <div class="revenue">{{revenue(movie)}}</div>
        </div>
      </div>
      <NextPageArrow class="white" target="/story/genre" />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader';
import NextPageArrow from '@/components/Arrows/NextPageArrow.vue';
import { mapGetters } from 'vuex';
import { beautifyCashValue } from '@/assets/js/helpers.js';

export default {
  // layout: 'innerPage',
  components: { TheHeader, NextPageArrow },
  data () {
    return {
      displayMenu: false
    };
  },
  computed: {
    ...mapGetters(['movies']),
    bubblesClasses () {
      return 'top-' + this.movies.length + '-movies';
    },
    title () {
      return `The top ${this.$store.getters.movies.length} highest grossing movies`;
    },
  },
  methods: {
    revenue (movie) {
      return beautifyCashValue(movie.revenue);
    },
    bubbleStyle (movie) {
      const size = this.scale(movie.revenue);
      return {
        width: size + 'px',
        height: size + 'px'
      };
    },
    scale (revenue) {
      const domain = this.movies.map(m => m.revenue);
      const maxRevenue = this.movies[0].revenue;
      const maxWidth = 60;

      return revenue * maxWidth / maxRevenue;


    }
  }
}
</script>

<style lang="scss" scoped>
.top-movies {
  position: relative;

  /deep/ .how-to-make {
    color: white;
  }
  /deep/ .the-header {
    padding: 0 4rem;
    position: absolute;
    z-index: 2;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }
  .presentation {
    padding: 100px 0;
    z-index: 1;

    .bubbles {
      // height: calc(100vh - 10em);
      width: 100%;
      margin-bottom: -2rem;
      padding: 0 5rem;
      display: grid;
      font-size: 14px;

      &.top-50-movies {
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(5, 1fr);
      }
      &.top-20-movies {
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

        img {
          width: 200%;
          height: 200%;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>