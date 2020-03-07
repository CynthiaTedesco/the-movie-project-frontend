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
  height: 15px;
  margin-top: 0.1rem;
  margin-right: 1.5rem;
  border-right: 1px solid white;
}
.arrow_box:after {
  left: 97.3%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(255, 255, 255, 0);
}
.arrow_box:after {
  top: 100%;
  border-width: 5px;
  margin-top: -5px;
  border-top-color: #ffffff;
}
</style>
