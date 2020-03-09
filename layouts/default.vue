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
div {
  max-width: 1118px;
  margin: auto;
}
</style>