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
  width: 1118px;
  margin: auto;
}
</style>