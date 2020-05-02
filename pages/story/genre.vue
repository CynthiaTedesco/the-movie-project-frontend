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
      name="genre_name"
    />
  </section>
</template>

<script>
import Bubbles from "@/Components/Charts/Bubbles";
import InnerPageDescription from "@/Components/InnerPageDescription";

export default {
  layout: 'innerPage',
  components: {
    InnerPageDescription,
    Bubbles
  },
  data () {
    return {
      movies: [],
      groups: {}
    }
  },
  async mounted () {
    await this.$store.dispatch('checkGenres')
    this.movies = await this.$store.getters.movies
    const temp = this.groupBy(this.movies, 'genres');
    this.groups = Object.entries(temp).sort((a, b) => b[1].length - a[1].length);
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
  methods: {
    groupBy (xs, key) {
      return xs.reduce(function (rv, x) {
        const innerKey = x[key].find(a => a.primary).genre_name;
        (rv[innerKey] = rv[innerKey] || []).push(x)
        return rv
      }, {})
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';
</style>
