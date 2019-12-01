<template>
  <div class="the-menu-toggle" @click="$emit('toggle')">
    {{ category }} 
    <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
     {{ subcategory }}
  </div>
</template>

<script>
export default {
  computed: {
    category () {
      console.log(this.$nuxt.$route.path)
      return 'category'
    },
    subcategory () {
      console.log(this.$nuxt.$route.path)
      return 'subcategory'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

.the-menu-toggle{
  color: #9f9c9c;
  cursor: pointer;

  @include media-breakpoint-up(md) {
    margin-left: 1rem;
    margin-top: 0.3rem;
  }
}

</style>
