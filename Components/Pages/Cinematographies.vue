<template>
  <PageComponent next="LengthPage"  class="cinematography" :navigate="navigate">
    <template v-slot:menu>
      Production /
      <br />Cinematographies
    </template>
    <template v-slot>
      <section id="cinematography" class="page-container page">
        <InnerPageDescription :question="question" pageKey="CinematographyPage" :text="text" />
        <Bubbles
          v-if="groups.length"
          :movies="movies"
          :groups="groups"
          :attr="keyword"
        />
      </section>
    </template>
  </PageComponent>
</template>

<script>
import PageComponent from '@/Components/Pages/PageComponent'
import Bubbles from "@/Components/Charts/Bubbles";
import bubblePage from '@/mixins/bubblePage.js';
import InnerPageDescription from "@/Components/InnerPageDescription";

import NextPageArrow from '@/Components/Arrows/NextPageArrow.vue'

export default {
  name: 'CinematographyPage',
  mixins: [bubblePage],
  components: {
    PageComponent,
    InnerPageDescription,
    NextPageArrow,
    Bubbles
  },
  data () {
    return {
      movies: [],
      groups: {},
      keyword: 'cinematography', //used in mixin
    }
  },
  props: {
    question: {
      type: String,
      required: true
    },
    navigate: String
  },
  computed: {
    text () {
      if (this.groups.length) {
        const name = this.groups[0][0];
        return `You cannot go wrong with a good old ${name.toLowerCase()} movie`;
      }

      return '';
    }
  },
}
</script>

<style lang="scss" scoped>
</style>