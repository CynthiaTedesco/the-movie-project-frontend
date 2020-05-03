<template>
  <BubbleCloudsSmall 
    v-if="this.display==='small'" 
    :movies="movies"
    :groups="groups"
    :hasMany="hasMany"
    :attr="attr"/>

  <BubbleCloudsLarge 
    v-else 
    :movies="movies"
    :groups="groups"
    :hasMany="hasMany"
    :attr="attr"/>
</template>

<script>
const d3 = require('d3');
import BubbleCloudsSmall from '@/Components/Layouts/BubbleCloudsSmall.vue';
import BubbleCloudsLarge from '@/Components/Layouts/BubbleCloudsLarge.vue';
import resizable from '@/mixins/resizable.js';

export default {
  name: 'bubbles',
  components: { BubbleCloudsSmall, BubbleCloudsLarge },
  mixins: [resizable],
  props: {
    movies: Array,
    groups: Array,
    attr: String,
    hasMany: Boolean
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/common.scss';
svg {
  overflow: visible;
}
</style>