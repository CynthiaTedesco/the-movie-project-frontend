<template>
  <div class="arrow arrow_box"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.arrow_box {
  position: relative;
  background: #ffffff;
  border-top: 1px solid white;
  margin: 0.3rem 0;
}
.arrow_box:after {
  top: 50%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(255, 255, 255, 0);
}
.arrow_box:after {
  left: 94.5%;
  border-width: 5px;
  margin-top: -5px;
  border-left-color: #ffffff;
}
</style>
