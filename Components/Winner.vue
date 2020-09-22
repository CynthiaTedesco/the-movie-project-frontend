<template>
  <div class="result">
    <div class="title">{{title}}</div>
    <div class="winner">
      <template v-if="icon">
        <span class="img-wrapper">
          <slot></slot>
          {{winner}}
        </span>
      </template>
      <template v-else>{{winner}}</template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    winner: String,
    icon: Boolean,
  },
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

    .img-wrapper {
      position: relative;

      /deep/ img {
        position: absolute;

        &.left {
          left: -2em;
          top: -1em;
          width: 2em;
        }

        &.flag {
          max-width: 70px;
        }

        &.right {
          right: -2em;
          top: -1em;
        }
      }
    }
  }
}
</style>