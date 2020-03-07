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
  margin-bottom: 0.5rem;
}
.arrow_box:before,
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
.arrow_box:before {
  right: 94.5%;
  border-right-color: #ffffff;
  border-width: 5px;
  margin-top: -5px;
}

// .arrow {
//   position: relative;
//   border-top: 1px solid white;

//   > div {
//     border-top: 0;
//     border-right: 1px solid white;
//     border-bottom: 1px solid white;
//     width: 10px;
//     height: 10px;
//     position: absolute;

//     &.left {
//       transform: rotate(135deg);
//       left: 3px;
//       top: -5px;
//     }
//     &.right {
//       transform: rotate(-45deg);
//       right: 3px;
//       top: -5px;
//     }
//   }
// }
</style>
