<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import { isMobile } from "@/assets/js/helpers.js";

export default {
  middleware: ["movies"],
  data() {
    return {
      displayMenu: false
    };
  },
  mounted() {
    this.$store.dispatch("setIsMobile", isMobile());
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

div {
  @include max-sized;
  margin: auto;
}
</style>