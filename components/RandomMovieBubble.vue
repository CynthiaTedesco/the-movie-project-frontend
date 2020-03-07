<template>
  <div v-if="movie">
    <div class="grid">
      <div class="top-left"></div>
      <div class="top-right"></div>
      <div class="center-left"></div>
      <div class="center-right">
        <div class="image">
          <img :src="movie.poster.url" alt="movie-poster" />
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

export default {
  components: { DoubleArrow },
  computed: {
    movie () {
      return this.$store.getters.randomMovie
    },
    revenue () {
      //TODO normalize everyting to dollars
      return this.beautifyRevenue(this.movie.revenue) + '$';
    }
  },
  methods: {
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30px 110px 10px;
  margin-right: 2rem;
  margin-top: -2em;

  > div {
    &.center-right,
    &.bottom-right {
      padding: 1em 0;
      border-right: 1px solid white;
      border-left: 1px solid white;
    }

    .revenue {
      text-align: center;
      padding: 0 3px;
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
