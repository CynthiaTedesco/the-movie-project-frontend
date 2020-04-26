<template>
  <div @click="$router.push(target)">
    <nuxt-link class="arrow" :to="target" />
  </div>
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

div,
.arrow {
  position: absolute;
  cursor: pointer;
}
div {
  bottom: 0;
  width: 100%;
  height: 50px;
  text-align: center;

  &.white {
    .arrow {
      border-bottom-color: white;
      border-right-color: white;
    }
  }
}
.arrow {
  border: none;
  border-bottom: 2px solid $blue-ferdio;
  border-right: 2px solid $blue-ferdio;
  transform: rotate(45deg);
  width: 20px;
  height: 20px;
  bottom: 20px;
}
</style>