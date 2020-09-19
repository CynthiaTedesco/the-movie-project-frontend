<template>
  <div class="result">
    <slot></slot>
    <div class="title">{{title}}</div>
    <div class="winner">{{winner}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    winner: String
  }
};
</script>

<style lang="scss" scoped>
.result {
  margin: 0 auto;
  text-align: center;
  width: 100%;
  position: relative;

  .title {
    font-family: "niveau-grotesk-light";
    font-size: 16px;
    margin-bottom: 0.8rem;
  }
  .winner {
    text-transform: capitalize;
    font-family: "jeff-script-regular";
    font-size: 30px;
  }
}
</style>