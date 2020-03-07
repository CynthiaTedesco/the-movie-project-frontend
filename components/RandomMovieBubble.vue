<template>
  <div v-if="movie">
    <div class="grid">
      <div class="top">
        <span>{{randomTopText}}</span>
        <ArrowToBottom />
      </div>
      <div class="center-left">
        <div class="random-fact">
          <span>{{randomLeftText}}</span>
          <RightArrow />
        </div>
      </div>
      <div class="center-right">
        <div class="image">
          <img :src="movie.poster.url" alt="movie-poster" :title="movie.title" />
        </div>
      </div>
      <div class="bottom-left"></div>
      <div class="bottom-right">
        <div class="revenue">
          <DoubleArrow />
          <span>{{ revenue }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    No movie
    <!-- <img :src="movie.poster.url" alt="movie-poster" /> -->
  </div>
</template>

<script>
import DoubleArrow from '@/components/Arrows/DoubleArrow';
import RightArrow from '@/components/Arrows/RightArrow';
import ArrowToBottom from '@/components/Arrows/ArrowToBottom';

export default {
  components: {
    DoubleArrow,
    RightArrow,
    ArrowToBottom
  },
  props: {
    movie: Object
  },
  computed: {
    revenue () {
      //TODO normalize everyting to dollars
      return this.beautifyRevenue(this.movie.revenue) + '$';
    },
    randomFacts () {
      const topFact = this.randomProperty(this.movie);
      const copy = { ...this.movie }
      delete copy[topFact];
      const leftFact = this.randomProperty(copy);

      return { topFact, leftFact };
    },
    randomLeftText () {
      return this.randomFactText(this.randomFacts.leftFact);
    },
    randomTopText () {
      return this.randomFactText(this.randomFacts.topFact);
    },
  },

  methods: {
    randomFactText (key) {
      const value = this.movie[key];
      switch (key) {
        case 'release_date':
          return 'Release: ' + (new Date(value)).getFullYear();
        case 'imdb_rating':
          return 'IMDB rating: ' + value;
        case 'budget':
          return 'Budget: ' + this.beautifyRevenue(value) + '$';
        case 'plot_line':
          return '"' + value + '"';
        case 'length':
          return value + ' min';
        default:
          return value;
      }
    },
    randomProperty (obj) {
      const k = ['budget', 'imdb_rating', 'length', 'release_date'];//'plot_line', 
      // const keys = Object.keys(obj);
      let key = k[k.length * Math.random() << 0];
      while (!obj[key]) {
        key = k[k.length * Math.random() << 0];
      }
      return key;
    },
    beautifyRevenue (labelValue) {
      // Nine Zeroes for Billions
      // Math.abs(Number(labelValue)) >= 1.0e+9

      // Six Zeroes for Millions 
      return Math.abs(Number(labelValue)) >= 1.0e+6

        ? Math.floor(Math.abs(Number(labelValue)) / 1.0e+6) + 'M'
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

          ? Math.floor(Math.abs(Number(labelValue)) / 1.0e+3) + 'K'

          : Math.floor(Math.abs(Number(labelValue)));
    }
  }
}
</script>

<style lang="scss" scoped>
div.grid {
  color: white;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  grid-template-rows: 30px 110px 10px;
  margin-right: 2rem;
  margin-top: -2em;

  > div {
    &.center-right,
    &.bottom-right {
      max-width: 103px;
    }

    &.center-right,
    &.bottom-right {
      padding: 1em 0;
      border-right: 1px solid white;
      border-left: 1px solid white;
    }

    &.top {
      grid-column: 1 / span 2;
      text-align: right;
      padding-right: 2rem;

      span {
        white-space: nowrap;
      }
    }

    .revenue {
      text-align: center;
      padding: 0 3px;
    }

    &.center-left {
      .random-fact {
        margin-top: 3rem;
      }
    }
  }
  .image {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    overflow: hidden;
    display: flex;
    justify-content: center;

    img {
      width: 200%;
      height: 200%;
      border-radius: 50%;
    }
  }
}
</style>
