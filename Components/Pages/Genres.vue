<template>
  <PageComponent >
    <template v-slot:menu>Story / Genre</template>
    <template v-slot>
      <section id="genres" class="page-container page">
        <InnerPageDescription
          :text="text"
          ordinal="1"
          question="Which genre should your movie be?"
        />
        <Bubbles
          v-if="groups.length"
          :movies="movies"
          :groups="groups"
          attr="genres"
          :hasMany="hasMany"
        />
        <NextPageArrow class="blue-ferdio" target="#lead-age" />
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
  name: 'genre-page',
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
      keyword: 'genres',
      hasMany: true
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
@import '~assets/styles/common.scss';
</style>