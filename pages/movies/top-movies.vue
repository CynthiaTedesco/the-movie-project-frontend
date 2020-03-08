<template>
  <div class="top-movies">
    <TheHeader
      @menuToggle="displayMenu =!displayMenu"
      :hide-logo="true"
      :hide-menu-toggle="true"
      :title="title"
    />
    <div class="presentation">
      <NextPageArrow class="white" target="/story/genre" />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader';
import NextPageArrow from '@/components/Arrows/NextPageArrow.vue'
export default {
  // layout: 'innerPage',
  components: { TheHeader, NextPageArrow },
  data () {
    return {
      displayMenu: false
    };
  },
  computed: {
    title () {
      return `The top ${this.$store.getters.movies.length} highest grossing movies`;
    }
  }
}
</script>

<style lang="scss" scoped>
.top-movies {
  position: relative;

  /deep/ .how-to-make {
    color: white;
  }
  /deep/ .the-header {
    padding: 0;
    position: absolute;
    z-index: 2;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }
  .presentation {
    // margin-top: -96px;
    z-index: 1;
  }
}
</style>