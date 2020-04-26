<template>
  <div>
    <nuxt />
  </div>
</template>

<script>

export default {
  middleware: ['device', 'movies'],
  data () {
    return {
      displayMenu: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/common.scss';

div {
  @include max-sized;
  margin: auto;
}
</style>