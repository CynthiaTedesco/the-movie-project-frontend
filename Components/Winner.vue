<template>
  <div class="result">
    <div class="title">{{title}}</div>
    <div class="winner">{{winnerLabel}}</div>
  </div>
</template>

<script>
import { slices } from "@/assets/js/helpers.js";

export default {
  data: () => {
    return {
      winnerLabel: "",
    };
  },
  props: {
    title: String,
    winner: String
  },
  beforeMount() {
    // if (!this.winner) {
    if (this.winner === "English") {
      // const movies = JSON.parse(
      //   JSON.stringify(await this.$store.getters.movies(slices()))
      // );
      // console.log('movies', movies);
      switch (this.title) {
        case "Series": {
          this.winnerLabel = "s";
          break;
        }
        case "Lead actor age": {
          this.winnerLabel = "laa";
          break;
        }
        case "Origin": {
          this.winnerLabel = "o";
          break;
        }
        case "Lead actor gender": {
          this.winnerLabel = "lag";
          break;
        }
        case "Genre": {
          this.winnerLabel = "ger";
          break;
        }
        case "Language": {
          this.winnerLabel = "l";
          break;
        }
        case "Universe": {
          this.winnerLabel = "u";
          break;
        }
        case "Poster": {
          this.winnerLabel = "p";
          break;
        }
        case "Age restriction": {
          this.winnerLabel = "ar";
          break;
        }
        case "Distribution Comp.": {
          this.winnerLabel = "dc";
          break;
        }
        case "Release month": {
          this.winnerLabel = "rm";
          break;
        }
        case "Country": {
          this.winnerLabel = "c";
          break;
        }
        case "Word Count": {
          this.winnerLabel = "wc";
          break;
        }
        case "Director age": {
          this.winnerLabel = "da";
          break;
        }
        case "Length": {
          this.winnerLabel = "l";
          break;
        }
        case "Director gender": {
          this.winnerLabel = "dg";
          break;
        }
        case "Cinematography": {
          this.winnerLabel = "c";
          break;
        }
        case "Budget": {
          this.winnerLabel = "b";
          break;
        }
      }
    } else {
      this.winnerLabel = this.winner;
    }
  }
};
</script>

<style lang="scss" scoped>
.result {
  margin: 0 auto;
  text-align: center;

  .title {
    font-family: "niveau-grotesk-light";
    font-size: 16px;
    margin-bottom: 0.8rem;
  }
  .winner {
    text-transform: capitalize;
    font-family: "jeff-script-regular";
    font-size: 30px;
  }
}
</style>