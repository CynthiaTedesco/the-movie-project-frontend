<template>
  <PageComponent next="ReleaseMonthPage" class="word_count">
    <template v-slot:menu>
      Production/
      <br />Word count
    </template>
    <template v-slot>
      <section id="word_count" class="page-container page">
        <InnerPageDescription :question="question" pageKey="WordCountPage" :text="text" />
        <Bubbles
          v-if="groups.length"
          :movies="movies"
          :groups="groups"
          :attr="keyword"
          :axis="true"
        />
      </section>
    </template>
  </PageComponent>
</template>

<script>
import PageComponent from "@/Components/Pages/PageComponent";
import Bubbles from "@/Components/Charts/Bubbles";
import bubblePage from "@/mixins/bubblePage.js";
import InnerPageDescription from "@/Components/InnerPageDescription";

import NextPageArrow from "@/Components/Arrows/NextPageArrow.vue";

export default {
  name: "WordCountPage",
  mixins: [bubblePage],
  components: {
    PageComponent,
    InnerPageDescription,
    NextPageArrow,
    Bubbles
  },
  data() {
    return {
      movies: [],
      groups: {},
      keyword: "word_count", //used in mixin,
      keywordFn: (movie) => Math.round(movie.word_count / movie.length),
      axis: true,
      plain: true
    };
  },
  props: {
    question: {
      type: String,
      required: true
    }
  },
  computed: {
    text() {
      if (this.groups.length) {
        const name = this.groups[0][0];
        return `You cannot go wrong with a good old ${name.toLowerCase()} movie`;
      }

      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>