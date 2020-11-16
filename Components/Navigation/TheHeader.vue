<template>
  <div class="the-header header-container">
    <div class="row px-0 py-2 py-md-3">
      <div class="col-xs-12 the-header__left">
        <div class="how-to-make" @click="scrollToTop">
          How to make
          <br />a blockbuster
        </div>
        <TheMenuToggle
          class="location"
          v-if="!hideMenuToggle"
          @toggle="$emit('menuToggle')"
        >
          <slot>{{ title }}</slot>
        </TheMenuToggle>
        <span class="location" v-else-if="title">{{ title }}</span>
      </div>
      <div class="col-sm-3 d-none" v-if="!hideLogo">
        <app-logo class="header-logo" />
      </div>
      <!-- <div class="col-sm-1"></div> -->
    </div>
  </div>
</template>

<script>
import AppLogo from "@/Components/AppLogo";
import TheMenuToggle from "@/Components/Navigation/TheMenuToggle";

export default {
  name: "TheHeader",
  components: {
    TheMenuToggle,
    AppLogo,
  },
  props: {
    hideLogo: {
      type: Boolean,
      default: false,
    },
    hideMenuToggle: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
  methods: {
    scrollToTop() {
      if (window) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

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
  padding-top: 40px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 1rem;

  height: 100px;

  @include media-breakpoint-up(sm) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  @include media-breakpoint-up(lg) {
    padding-top: 1rem;
  }

  &.negative {
    padding: 1rem 4rem;
    color: $white;
    position: absolute;
    z-index: 2;
    margin-left: auto;
    margin-right: auto;
    top: 0;
    left: 0;
    right: 0;

    background-image: radial-gradient(#d0d0d0 0%, #2b4ab7 5%);
    background-position: 0 0;
    background-size: 40px 40px;
    // position: fixed;
    color: $white;
    @include max-sized;

    @include media-breakpoint-down(l) {
      .location {
        padding: 0;
      }
    }

    /deep/ .the-menu-toggle {
      color: $white;

      .arrow{
        border-color: $white;
      }
    }

    .how-to-make {
      color: $white;
    }
  }
}
.header-logo {
  margin-left: auto;
}
.how-to-make {
  color: $blue;
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
