<template>
  <PageComponent next="OriginPage" class="genres" :navigate="navigate">
    <template v-slot:menu>Story / Genre</template>
    <template v-slot>
      <section id="genres" class="page-container page">
        <InnerPageDescription :text="text" page-key="GenrePage" :question="question" />
        <Bubbles
          v-if="groups.length"
          :movies="movies"
          :groups="groups"
          :attr="keyword"
          :singleKeyword="singleKeyword"
          :hasMany="hasMany"
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

export default {
  name: "GenrePage",
  mixins: [bubblePage],
  components: {
    PageComponent,
    InnerPageDescription,
    Bubbles
  },
  data() {
    return {
      movies: [],
      groups: {},
      keyword: "genres",
      singleKeyword: "genre_name",
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