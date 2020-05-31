<template>
  <PageComponent next="DistributionCompaniesPage" class="release_date">
    <template v-slot:menu>
      Release/
      <br />Release Month
    </template>
    <template v-slot>
      <section id="release_date" class="page-container page">
        <InnerPageDescription :question="question" pageKey="ReleaseMonthPage" :text="text" />
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
import { getMonth } from "date-fns";
export default {
  name: "ReleaseMonthPage",
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
      keyword: "release_date", //used in mixin,
      keywordFn: date => date.split('-')[1],
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