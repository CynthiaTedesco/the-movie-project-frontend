<template>
  <PageComponent next="PosterPage" class="restrictions" :navigate="navigate">
    <template v-slot:menu>Release /<br/> Age restriction</template>
    <template v-slot>
      <section id="restrictions" class="page-container page">
        <InnerPageDescription
          :question="question"
          pageKey="RestrictionPage"
          :text="text"
        />
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
import PageComponent from '@/Components/Pages/PageComponent'
import Bubbles from "@/Components/Charts/Bubbles";
import bubblePage from '@/mixins/bubblePage.js';
import InnerPageDescription from "@/Components/InnerPageDescription";

import NextPageArrow from '@/Components/Arrows/NextPageArrow.vue'

export default {
  name: 'RestrictionPage',
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
      keyword: 'restrictions', //used in mixin
      singleKeyword: 'restriction_name',
      hasMany:true
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