<template>
  <div class="results page" id="results">
    <TheHeader
      class="negative"
      @menuToggle="displayMenu =!displayMenu"
      :hide-logo="true"
      :hide-menu-toggle="true"
      title="The Results"
    />
    <div v-if="loadedWinners" class="presentation">
      <div class="results">
        <div class="section story">
          <div class="title">Story</div>
          <div>
            <Winner :winner="winners['universe']" title="Universe" />
            <Winner :winner="winners['languages-language_name']" title="Language" />
          </div>
          <div>
            <Winner :winner="winners['genres-genre_name']" title="Genre" />
            <Winner :winner="winners['characters-gender']" title="Lead actor gender" />
          </div>
          <div>
            <Winner :winner="winners['story_origin']" title="Origin" />
            <Winner :winner="winners['characters-age']" title="Lead actor age" />
          </div>
          <Winner :winner="winners['serie']" title="Series" />
        </div>
        <div class="section production">
          <div class="title">Production</div>
          <div>
            <Winner :winner="winners['budget']" title="Budget" />
            <Winner :winner="winners['cinematography']" title="Cinematography" />
          </div>
          <div>
            <Winner :winner="winners['directors-gender']" title="Director gender" />
            <Winner :winner="winners['length']" title="Length" />
          </div>
          <div>
            <Winner :winner="winners['directors-age']" title="Director age" />
            <Winner :winner="winners['word_count']" title="Word Count" />
          </div>
          <Winner :winner="winners['producers-country'].toUpperCase()" title="Country" />
        </div>
        <div class="section release">
          <div class="title">Release</div>
          <Winner :winner="winners['release_date']" title="Release month" />
          <Winner :winner="winners['distribution_company']" title="Distribution Comp." />
          <Winner
            :winner="winners['restrictions-restriction_name'].toUpperCase()"
            title="Age restriction"
          />
          <Winner :winner="winners['poster']" title="Poster" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/Components/Navigation/TheHeader";
import Winner from "@/Components/Winner";
import MENUITEMS from "@/constants/menuItems.js";
import {
  slices,
  winnerKey,
  getAgesGroups,
  getMonthsGroups,
  getBudgetsGroups,
  getLengthsGroups,
  getWordCountsGroups,
  simpleGroups,
  calculateWinner,
  groupByPlain,
  groupByManyWithInnerKey,
  groupByKeywordFn,
  groupByObject
} from "@/assets/js/helpers.js";
import { mapGetters } from "vuex";

export default {
  name: "ResultsPage",
  components: { TheHeader, Winner },
  data() {
    return {
      loadedWinners: false,
      movies: []
    };
  },
  computed: {
    ...mapGetters(["winners"])
  },
  async beforeMount() {
    if (Object.keys(this.winners).length < MENUITEMS.length - 1) {
      //calculate missing winners
      await this.$store.dispatch("checkGenres");
      await this.$store.dispatch("checkRestrictions");
      await this.$store.dispatch("checkProducers");
      await this.$store.dispatch("checkLanguages");
      await this.$store.dispatch("checkDirectors");
      await this.$store.dispatch("checkCharacters");

      this.movies = JSON.parse(
        JSON.stringify(await this.$store.getters.movies(slices()))
      );
      await this.setWinners();
      this.loadedWinners = true;
    } else {
      this.loadedWinners = true;
    }
  },
  methods: {
    setWinner(groups, keyword, singleKeyword) {
      const winner = calculateWinner(groups);
      const key = winnerKey(keyword, singleKeyword);
      return this.$store.dispatch("addWinner", [key, winner.toLowerCase()]);
    },
    setSimpleWinner(key) {
      const temp = groupByObject(this.movies, key);
      const groups = simpleGroups(temp);
      this.setWinner(groups, key);
    },
    setListWinner(key, singleKeyword) {
      const temp = groupByManyWithInnerKey(this.movies, key, { singleKeyword });
      const groups = simpleGroups(temp);
      this.setWinner(groups, key, singleKeyword);
    },
    setPeopleWinners(key, primaryKey = "primary") {
      const temp1 = groupByManyWithInnerKey(this.movies, key, {
        singleKeyword: "age",
        primaryKey
      });
      const ages_groups = getAgesGroups(temp1);
      this.setWinner(ages_groups, key, "age");

      const temp2 = groupByManyWithInnerKey(this.movies, key, {
        singleKeyword: "gender",
        primaryKey
      });
      const groups = simpleGroups(temp2);
      this.setWinner(groups, key, "gender");
    },
    setSpecialPlainWinner(key, fn) {
      const temp = groupByPlain(this.movies, key);
      const groups = fn(temp);
      this.setWinner(groups, key);
    },
    setPosterWinner() {
      const key = "poster";
      const temp = groupByKeywordFn(this.movies, movie =>
        movie.poster.poster_type ? movie.poster.poster_type.name : ""
      );
      const groups = simpleGroups(temp);
      this.setWinner(groups, key);
    },
    setReleaseMonthWinner() {
      const key = "release_date";
      const temp = groupByKeywordFn(
        this.movies,
        movie => movie.release_date.split("-")[1]
      );
      const groups = getMonthsGroups(temp);
      this.setWinner(groups, key);
    },
    setWordCountWinner() {
      const key = "word_count";
      const temp = groupByKeywordFn(this.movies, movie =>
        Math.round(movie.word_count / movie.length)
      );
      const groups = getWordCountsGroups(temp);
      this.setWinner(groups, key);
    },
    setWinners() {
      return Promise.all([
        this.setSpecialPlainWinner("budget", getBudgetsGroups),
        this.setSpecialPlainWinner("length", getLengthsGroups),

        this.setPeopleWinners("characters", "main"),
        this.setPeopleWinners("directors"),

        this.setSimpleWinner("cinematography"),
        this.setSimpleWinner("serie"),
        this.setSimpleWinner("distribution_company"),
        this.setSimpleWinner("story_origin"),
        this.setSimpleWinner("universe"),

        this.setListWinner("genres", "genre_name"),
        this.setListWinner("languages", "language_name"),
        this.setListWinner("producers", "country"),
        this.setListWinner("restrictions", "restriction_name"),

        this.setPosterWinner(),
        this.setReleaseMonthWinner(),
        this.setWordCountWinner()
      ]);
    },
  }
};
</script>

<style lang="scss" scoped>
#results {
  position: relative;
  .presentation {
    padding: 130px 60px 50px;

    .results {
      display: grid;
      grid-template-rows: 2fr 2fr 1fr;
      max-height: 75vh;

      .section {
        display: grid;
        grid-template-columns: 150px repeat(4, 1fr);

        &.story,
        &.production {
          > div:not(:last-child):not(.title) {
            display: grid;
            grid-template-rows: repeat(2 1fr);
          }
        }
        > div {
          &.title {
            font-weight: bolder;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>