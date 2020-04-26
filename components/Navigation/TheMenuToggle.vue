<template>
  <div class="the-menu-toggle" @click="$emit('toggle')">
    <template v-if="this.$nuxt.$route.path!=='/'">
      {{ category }} 
      <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
      {{ subcategory }}
    </template>
    <span v-else>Menu</span>
  </div>
</template>

<script>
export default {
  computed: {
    category () {
      console.log(this.$nuxt.$route.path)
      return this.$nuxt.$route.path.split('/')[1];
    },
    subcategory () {
      return this.$nuxt.$route.path.split('/')[2];
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

.the-menu-toggle{
  color: #9f9c9c;
  cursor: pointer;
  text-transform: capitalize;

  @include media-breakpoint-up(md) {
    margin-left: 1rem;
    margin-top: 0.3rem;
  }
}

</style>
