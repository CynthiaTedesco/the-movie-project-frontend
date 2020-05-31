<template>
  <PageComponent next="DirectorAgePage" class="directors">
    <template v-slot:menu>Production /<br/> Director gender</template>
    <template v-slot>
      <section id="directors" class="page-container page">
        <InnerPageDescription
          :question="question"
          pageKey="DirectorGenderPage"
          :text="text"
        />
        <Bubbles
          v-if="groups.length"
          :movies="movies"
          :groups="groups"
          :attr="keyword"
          :hasMany="hasMany"
          :singleKeyword="singleKeyword"
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
  name: 'DirectorGenderPage',
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
      keyword: 'directors', //used in mixin,
      singleKeyword: 'gender',
      hasMany: true
    }
  },
  props: {
    question: {
      type: String,
      required: true
    }
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