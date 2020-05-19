<template>
  <PageComponent next="GenrePage">
    <template v-slot:menu>Story /<br/> Universes</template>
    <template v-slot>
      <section id="universes" class="page-container page">
        <InnerPageDescription
          :question="question"
          pageKey="lalsa"
          :text="text"
        />
        <!-- <Bubbles
          v-if="groups.length"
          :movies="movies"
          :groups="groups"
          attr="universes"
        />-->
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
  name: 'UniversePage',
  components: { PageComponent },
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
      keyword: 'universes',
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