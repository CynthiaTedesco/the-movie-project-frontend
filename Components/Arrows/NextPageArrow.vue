<template>
  <div @click.stop.prevent="onClick" class="arrow-container">
    <span class="arrow"></span>
  </div>
</template>

<script>
import EventBus from '@/assets/js/eventBus.js';

export default {
  props: {
    target: {
      type: String,
      required: true
    },
    render: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    onClick () {
      this.$nextTick(() => {
        EventBus.$emit('scrollToTarget', this.target);
      });
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
.arrow-container {
  bottom: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  z-index: 15;

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