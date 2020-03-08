<template>
  <nuxt-link class="arrow" :to="target" />
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/common.scss';

.arrow {
  border: none;
  border-bottom: 2px solid $blue-ferdio;
  border-right: 2px solid $blue-ferdio;
  transform: rotate(45deg);
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 30px;

  &.white {
    border-bottom-color: white;
    border-right-color: white;
  }

  .arrow {
    width: 100%;
    height: 100%;
  }
}
</style>