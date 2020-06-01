<template>
  <PageComponent next="CinematographyPage" class="producers" :navigate="navigate">
    <template v-slot:menu>
      Production /
      <br />Country
    </template>
    <template v-slot>
      <section id="producers" class="page-container page">
        <InnerPageDescription :question="question" pageKey="CountryPage" :text="text" />
        <Bubbles
          v-if="groups.length"
          :movies="movies"
          :groups="groups"
          :hasMany="hasMany"
          :attr="keyword"
          :singleKeyword="singleKeyword"
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
  name: "CountryPage",
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
      keyword: "producers", //used in mixin
      singleKeyword: "country",
      hasMany: true
    };
  },
  props: {
    question: {
      type: String,
      required: true
    },
    navigate: String
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