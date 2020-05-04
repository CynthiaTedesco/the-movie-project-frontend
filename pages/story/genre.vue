<template>
  <section class="page-container">
    <InnerPageDescription
      :text="text" ordinal="1"
      question="Which genre should your movie be?"
    />
    <Bubbles
      v-if="groups.length"
      :movies="movies"
      :groups="groups"
      attr="genres"
      :hasMany="hasMany"
    />
  </section>
</template>

<script>
import Bubbles from "@/Components/Charts/Bubbles";
import bubblePage from '@/mixins/bubblePage.js';
import InnerPageDescription from "@/Components/InnerPageDescription";

export default {
  name: 'genre-page',
  layout: 'innerPage',
  mixins: [bubblePage],
  components: {
    InnerPageDescription,
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
};
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';
</style>
