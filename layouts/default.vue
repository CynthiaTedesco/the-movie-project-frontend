<template>
  <nuxt />
</template>

<script>

export default {
  middleware: 'device',
  data () {
    return {
      displayMenu: false
    };
  }
};
</script>
