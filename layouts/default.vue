<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import { isMobile, isTablet } from "@/assets/js/helpers.js";

export default {
  middleware: ["movies"],
  data() {
    return {
      displayMenu: false
    };
  },
  mounted() {
    this.$store.dispatch("setIsMobile", isMobile());
    this.$store.dispatch("setIsTablet", isTablet());
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