<template>
  <div class="the-menu-toggle" @click="$emit('toggle')">
    <slot>
      <span>Menu</span>
    </slot>
    <ArrowDown/>
  </div>
</template>

<script>
import ArrowDown from '@/Components/Arrows/ArrowDown';

export default {
  components: {
    ArrowDown
  },
  computed: {
    category () {
      return this.$nuxt.$route.path.split('/')[1];
    },
    subcategory () {
      return this.$nuxt.$route.path.split('/')[2];
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/common.scss';

.the-menu-toggle {
  color: $gray;
  cursor: pointer;
  display: flex;
  text-transform: capitalize;

  @include media-breakpoint-up(md) {
    margin-left: 1rem;
    margin-top: 0.3rem;
  }
}
</style>
