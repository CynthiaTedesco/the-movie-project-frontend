<template>
  <div class="the-header header-container">
    <div class="row px-0 py-2 py-md-3">
      <div class="col-xs-12 the-header__left">
        <div class="how-to-make">
          How to make
          <br />a blockbuster
        </div>
        <TheMenuToggle class="location" v-if="!hideMenuToggle" @toggle="$emit('menuToggle')">
          <slot></slot>
        </TheMenuToggle>
        <span class="location" v-else-if="title">{{title}}</span>
      </div>
      <div class="col-sm-3 d-none" v-if="!hideLogo">
        <app-logo class="header-logo" />
      </div>
      <!-- <div class="col-sm-1"></div> -->
    </div>
  </div>
</template>

<script>
import AppLogo from '@/Components/AppLogo'
import TheMenuToggle from '@/Components/Navigation/TheMenuToggle'

export default {
  name: 'TheHeader',
  components: {
    TheMenuToggle,
    AppLogo
  },
  props: {
    hideLogo: {
      type: Boolean,
      default: false
    },
    hideMenuToggle: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/common.scss';

.header-container > .row {
  flex-wrap: unset;
  min-height: 60px;

  > div {
    display: flex;
    // align-items: center;
    // justify-content: center;
  }
}
.the-header {
  padding: 1rem 2rem;
  height: 100px;

  @include media-breakpoint-up(sm) {
    padding: 1rem 4rem;
  }
}
.header-logo {
  margin-left: auto;
}
.how-to-make {
  color: $blue-ferdio;
  line-height: 1.2em;
  font-weight: bolder;
  font-size: 20px;
  white-space: nowrap;
}
.the-header__left {
  display: flex;
  flex-direction: column;
  position: relative;

  span.location {
    color: $dirty-white;
  }

  /deep/ .location {
    padding-left: 1rem;
    margin-top: 1.5rem;
    white-space: nowrap;
    br {
      display: none;
    }
    @include media-breakpoint-down(l) {
      position: absolute;
      right: 0;
      top: 0;
      margin: 0;
      white-space: normal;
      margin-right: 1rem;

      br {
        display: block;
      }
    }
  }

  @include media-breakpoint-up(md) {
    flex-direction: row;
  }
}
</style>
