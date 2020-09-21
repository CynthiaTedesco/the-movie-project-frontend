<template>
  <PageComponent
    next="GenrePage"
    class="universe"
    :navigate="navigate"
    :params="currentPage"
    @loadNext="loadNext"
  >
    <template v-slot>
      <section id="universe" class="page-container page">
        <InnerPageDescription :question="question" page-key="UniversePage" :text="text" />
        <Bubbles
          ref="bubbles"
          v-if="groups.length"
          :movies="movies"
          :groups="groups"
          :attr="keyword"
          :singleKeyword="singleKeyword"
          :hasMany="hasMany"
        />
        <button style="z-index:9999" @click="loadGenres">click at me!</button>
      </section>
    </template>
  </PageComponent>
</template>

<script>
import PageComponent from "@/Components/Pages/PageComponent2";
import Bubbles from "@/Components/Charts/Bubbles";
import bubblePage from "@/mixins/bubblePage.js";
import InnerPageDescription from "@/Components/InnerPageDescription";
import { mapGetters } from "vuex";
import MENUITEMS from "@/constants/menuItems.js";

import NextPageArrow from "@/Components/Arrows/NextPageArrow.vue";

export default {
  name: "UniversePage",
  mixins: [bubblePage],
  components: {
    PageComponent,
    InnerPageDescription,
    NextPageArrow,
    Bubbles,
  },
  data() {
    return {
      currentPageKey: "UniversePage",
      movies: [],
      groups: {},
      keyword: "universe", //used in mixin,
      singleKeyword: "",
      hasMany: false,
      // nextPage: {
      //   keyword: "genres",
      //   singleKeyword: "genre_name",
      //   hasMany: true,
      // },
    };
  },
  props: {
    question: {
      type: String,
      required: true,
    },
    navigate: String,
  },
  computed: {
    currentPage() {
      return MENUITEMS.find((mi) => mi.key === this.currentPageKey);
    },
    ...mapGetters(["allGroups"]),
    text() {
      if (this.groups.length) {
        const name = this.groups[0][0];
        return `You cannot go wrong with a good old ${name.toLowerCase()} movie`;
      }

      return "";
    },
  },
  mounted() {
    this.$store.dispatch("checkGenres");
  },
  methods: {
    loadNext(target) {
      this.loadGenres(target);
    },
    async loadGenres(target) {
      const allGroups = this.$store.getters["allGroups"];
      this.keyword = target.keyword;
      this.singleKeyword = target.singleKeyword;
      this.hasMany = target.hasMany;
      await this.preProcess(); //set in bubblePage mixin!
    },
  },
};
</script>

<style lang="scss" scoped>
</style>