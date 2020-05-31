<template>
  <PageComponent next="WordCountPage" class="length">
    <template v-slot:menu>Production /<br/> Length</template>
    <template v-slot>
      <section id="length" class="page-container page">
        <InnerPageDescription
          :question="question"
          pageKey="LengthPage"
          :text="text"
        />
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
import PageComponent from '@/Components/Pages/PageComponent'
import Bubbles from "@/Components/Charts/Bubbles";
import bubblePage from '@/mixins/bubblePage.js';
import InnerPageDescription from "@/Components/InnerPageDescription";

import NextPageArrow from '@/Components/Arrows/NextPageArrow.vue'

export default {
  name: 'LengthPage',
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
      keyword: 'length', //used in mixin,
      axis: true,
      plain: true,
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