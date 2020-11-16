<template>
  <div class="arrow-container">
    <span class="arrow"></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

.arrow {
  position: absolute;
  cursor: pointer;
}
.arrow-container {
  width: 30px;
  height: 30px;
  position: relative;
  margin-top: 5px;
  text-align: center;
  z-index: 17; /*on top of the chart-container if necessary */

  &.white {
    .arrow {
      border-bottom-color: white;
      border-right-color: white;
    }
  }

  &.blue-ferdio {
    .arrow {
      border-bottom-color: $blue;
      border-right-color: $blue;
    }
  }
}
.arrow {
  border: none;
  border-bottom: 2px solid $gray;
  border-right: 2px solid $gray;
  transform: rotate(45deg);
  height: 10px;
  width: 10px;
  bottom: 20px;
}
</style>