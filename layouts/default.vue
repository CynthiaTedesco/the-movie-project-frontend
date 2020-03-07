<template>
  <nuxt />
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
