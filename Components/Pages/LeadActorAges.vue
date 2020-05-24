<template>
  <PageComponent next="BudgetPage" class="characters-age">
    <template v-slot:menu>Story /<br/> Lead actor age</template>
    <template v-slot>
      <section id="characters-age" class="page-container page">
        <InnerPageDescription
          :question="question"
          pageKey="LeadActorAgePage"
          :text="text"
        />
        <Bubbles
          v-if="groups.length"
          :movies="movies"
          :groups="groups"
          attr="characters"
          :hasMany="hasMany"
          :winner="winner"
          :singleKeyword="singleKeyword"
          :axis="true"
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
  name: 'LeadActorAgePage',
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
      keyword: 'characters', //used in mixin,
      singleKeyword: 'age',
      hasMany: true,
      axis: true
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