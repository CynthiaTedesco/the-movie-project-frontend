<template>
  <div class="description">
    <div class="counter">{{counter}}</div>
    <div class="title">{{question}}</div>
    <div v-if="text" class="text">{{text}}</div>
    <div class="share">Share</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false
    },
    question: {
      type: String,
      required: true
    },
    ordinal: {
      type: String,
      required: true
    }
  },
  computed: {
    counter () {
      const total = 20;//TODO save menu items in the store
      return `${this.ordinal}/${total}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';
.description {
  background: transparent;
  z-index: 14;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 10px;
  color: $black;
  letter-spacing: 1px;
}
</style>