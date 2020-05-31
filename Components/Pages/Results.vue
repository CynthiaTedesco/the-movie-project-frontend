<template>
  <div class="results page" id="results">
    <TheHeader
      class="negative"
      @menuToggle="displayMenu =!displayMenu"
      :hide-logo="true"
      :hide-menu-toggle="true"
      title="The Results"
    />
    <div class="presentation">
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
          <Winner :winner="winners['restrictions-restriction_name'].toUpperCase()" title="Age restriction" />
          <Winner :winner="winners['poster']" title="Poster" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/Components/Navigation/TheHeader";
import Winner from "@/Components/Winner";
import { mapGetters } from "vuex";

export default {
  name: "ResultsPage",
  components: { TheHeader, Winner },
  computed: {
    ...mapGetters(["winners"])
  },
  async beforeMount() {
    if (Object.keys(this.winners).length < 18 ) {
      //calculate missing winners
      const movies = JSON.parse(
        JSON.stringify(await this.$store.getters.movies(slices()))
      );
//       budget: "$200m"
// characters-age: "35-40"
// characters-gender: "male"
// cinematography: "live action"
// directors-age: "45-50"
// directors-gender: "male"
// distribution_company: "walt disney studios motion pictures"
// genres-genre_name: "action"
// languages-language_name: "english"
// length: "150 min"
// poster: "head montage"
// producers-country: "us"
// release_date: "april"
// restrictions-restriction_name: "pg-13"
// serie: "sequel"
// story_origin: "original"
// universe: "sci-fi"
// word_count: "100 words/min"
      debugger;
    } else {
      console.log("this.winners", this.winners);
    }
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
      // border: 1px solid white;
      max-height: 75vh;

      .section {
        // border: 1px solid green;
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
          // border: 1px solid red;
        }
      }
    }
  }
}
</style>