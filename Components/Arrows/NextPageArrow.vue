<template>
  <div @click.stop.prevent="onClick">
    <span class="arrow"></span>
    <!-- <nuxt-link class="arrow"/> -->
    <!-- :to="target"  -->
  </div>
</template>

<script>
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
        let scroll = false;
        let parent = this.$parent;
        let target = parent ? parent.$refs[this.target] : null;

        if (target && target.$el) {
          scroll = true;
        } else {
          //we check grandparent
          parent = parent.$parent;
          target = parent ? parent.$refs[this.target] : null;
          scroll = target && target.$el;
        }

        if (scroll) {
          target.$el.scrollIntoView();
        }
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
div {
  bottom: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  // position: sticky;

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