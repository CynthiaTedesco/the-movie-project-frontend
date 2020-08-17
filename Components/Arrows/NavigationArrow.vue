<template>
  <div @click.stop.prevent="onClick" :class="classes">
    <span class="arrow"></span>
  </div>
</template>

<script>
import EventBus from "@/assets/js/eventBus.js";

export default {
  props: {
    toNextPage: Boolean,
  },
  computed: {
    classes() {
      let classes = ["arrow-container"];
      classes.push(this.toNextPage ? "next" : "previous");
      return classes.join(" ");
    },
  },
  methods: {
    onClick() {
      if(this.toNextPage){
        this.$emit("loadNext");
      } else {
        this.$emit("loadPrevious");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

div,
.arrow {
  position: absolute;
  cursor: pointer;
}
.arrow-container {
  width: 100%;
  height: 50px;
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
      border-bottom-color: $blue-ferdio;
      border-right-color: $blue-ferdio;
    }
  }

  .arrow {
    border: none;
    border-bottom: 2px solid $blue-ferdio;
    border-right: 2px solid $blue-ferdio;
    width: 20px;
    height: 20px;
  }

  &.next {
    bottom: 0;

    .arrow {
      transform: rotate(45deg);
      bottom: 20px;
    }
  }
  &.previous {
    top: 0;

    .arrow {
      transform: rotate(-135deg);
      top: 20px;
    }
  }
}
</style>