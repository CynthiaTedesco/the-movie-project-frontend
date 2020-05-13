<template>
  <div class="top-movies page" id="top-movies">
    <TheHeader
      @menuToggle="displayMenu =!displayMenu"
      :hide-logo="true"
      :hide-menu-toggle="true"
      :title="title"
    />
    <div class="presentation">
      <div v-if="movies" class="bubbles" :class="bubblesClasses">
        <div v-for="movie in slicedMovies" :key="movie.id">
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
    </div>
  </div>
</template>

<script>
import TheHeader from '@/Components/Navigation/TheHeader';
import NextPageArrow from '@/Components/Arrows/NextPageArrow.vue';
import { mapGetters } from 'vuex';
import { beautifyCashValue } from '@/assets/js/helpers.js';

export default {
  // layout: 'innerPage',
  components: { TheHeader, NextPageArrow },
  data () {
    return {
      displayMenu: false,
      isMobile: false,
      slicedMovies: [],
      mobileSize: 20,
      nextView: 'genre'
    };
  },
  watch: {
    isMobile () {
      if (this.isMobile) {
        if (this.slicedMovies.length > this.mobileSize) {
          console.log('watcher');
          this.slicedMovies = this.movies.slice(0, this.mobileSize);
        }
      } else {
        if (this.slicedMovies.length < this.movies.length) {
          console.log('watcher');
          this.slicedMovies = this.movies
        }
      }

      if (this.slicedMovies.length === 0) {
        console.log('watcher');
        this.slicedMovies = this.movies
      }
    },
    slicedMovies (a, b) {
      console.log('watcher slicedMovies', a.length, b.length);
    }
  },
  mounted () {
    const isMobile = document.documentElement.clientWidth <= 768;
    this.slicedMovies = isMobile ? this.movies.slice(0, this.mobileSize) : this.movies;

    this.$nextTick(function () {
      this.slicedMovies = isMobile ? this.movies.slice(0, this.mobileSize) : this.movies;
      window.addEventListener('resize', this.getWindowWidth);

      //Init
      this.getWindowWidth()
    })

  },
  computed: {
    ...mapGetters(['movies']),
    bubblesClasses () {
      return 'top-' + this.slicedMovies.length + '-movies';
    },
    title () {
      return `The top ${this.slicedMovies.length} highest grossing movies`;
    },
  },
  methods: {
    getWindowWidth (event) {
      this.isMobile = document.documentElement.clientWidth <= 768;
    },
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
@import '~/assets/styles/common.scss';

.top-movies {
  position: relative;

  /deep/ .how-to-make {
    color: white;
  }
  /deep/ .the-header {
    padding: 1rem 4rem;
    position: absolute;
    z-index: 2;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    left: 0;
    right: 0;
    

    background-image: radial-gradient(#d0d0d0 0%, #2b4ab7 5%);
    background-position: 0 0;
    background-size: 40px 40px;
    // position: fixed;
    color: #dad8d8;
    @include max-sized;
  }
  .presentation {
    padding: 100px 0;
    padding-top: 150px;
    z-index: 1;

    .bubbles {
      padding: 0 6rem;

      width: 100%;
      margin-bottom: -2rem;

      display: grid;
      font-size: 14px;

      &.top-50-movies {
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(5, 1fr);

        @include media-breakpoint-down(l) {
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(4, 1fr);
        }
      }
      &.top-20-movies {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(10, 1fr);

        @include media-breakpoint-up(sm) {
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(5, 1fr);
        }
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