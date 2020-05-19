<template>
  <div class="description">
    <div class="counter">{{counter}}</div>
    <div class="title">{{question}}</div>
    <div v-if="text" class="text">{{text}}</div>
    <div class="share">
      <span class="label">Share</span>
      <a href="#" class="icon">
        <font-awesome-icon class="share-icon" :icon="['fas', 'external-link-alt']" />
      </a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MENUITEMS from '@/constants/menuItems.js'

library.add(faExternalLinkAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)


export default {
  name:'inner-page-description',
  props: {
    text: {
      type: String,
      required: false
    },
    question: {
      type: String,
      required: true
    },
    pageKey: {
      type: String,
      required: true
    }
  },
  computed: {
    counter () {
      const ordinal = MENUITEMS.findIndex(a=>a.pageKey===this.pageKey)+1;
      const total = MENUITEMS.length;
      return `${ordinal+1}/${total}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';
.description {
  background: transparent;
  z-index: 14;
  .share {
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      font-size: 0.8rem;
      color: white;
    }
  }

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