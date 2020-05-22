<template>
  <CategoriesSmall 
    v-if="this.display==='small'" 
    :movies="movies"
    :groups="groups"
    :hasMany="hasMany"
    :singleKeyword="singleKeyword"
    :attr="attr"/>

  <CategoriesLarge 
    v-else 
    :movies="movies"
    :groups="groups"
    :hasMany="hasMany"
    :singleKeyword="singleKeyword"
    :attr="attr"/>
</template>

<script>
const d3 = require('d3');
import CategoriesSmall from '@/Components/Layouts/CategoriesSmall.vue';
import CategoriesLarge from '@/Components/Layouts/CategoriesLarge.vue';
import resizable from '@/mixins/resizable.js';

export default {
  name: 'bubbles',
  components: { CategoriesSmall, CategoriesLarge },
  mixins: [resizable],
  props: {
    movies: Array,
    groups: Array,
    attr: String,
    hasMany: Boolean,
    singleKeyword: String
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/common.scss';
svg {
  overflow: visible;
}
</style>