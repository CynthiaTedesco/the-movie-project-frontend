<template>
  <div class="arrow-container" @click.stop.prevent="onClick">
    <span class="arrow"></span>
  </div>
</template>

<script>
import EventBus from "@/assets/js/eventBus.js";

export default {
  props: {
    target: {
      type: String,
    },
    render: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    onClick() {
      if (this.target) {
        this.$nextTick(() => {
          EventBus.$emit("scrollToTarget", this.target);
        });
      } else {
        EventBus.$emit("loadNext");
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
  bottom: 0;
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
      border-bottom-color: $blue;
      border-right-color: $blue;
    }
  }
}
.arrow {
  border: none;
  border-bottom: 2px solid $blue;
  border-right: 2px solid $blue;
  transform: rotate(45deg);
  width: 20px;
  height: 20px;
  bottom: 20px;
}
</style>