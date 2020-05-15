<template>
  <div class="inner-page">
    <TheHeader @menuToggle="displayMenu =!displayMenu">
      <slot name="menu"></slot>
    </TheHeader>
    <TheMenu :show="displayMenu" @close="displayMenu=false" />
    <slot></slot>
    <NextPageArrow class="blue-ferdio" :target="next" />
  </div>
</template>

<script>
import TheHeader from '@/Components/Navigation/TheHeader';
import TheMenu from '@/Components/Navigation/TheMenu';
import NextPageArrow from '@/Components/Arrows/NextPageArrow.vue'

export default {
  components: { TheHeader, TheMenu, NextPageArrow },
  data () {
    return {
      displayMenu: false,
    };
  },
  props: {
    next: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/common.scss';
.inner-page {
  min-height: 100vh;
  max-height: 100vh;
  background-image: radial-gradient(#2b4ab7 0%, #ffffff 5%);
  background-position: 0 0;
  background-size: 40px 40px;
  position: relative;

  @include media-breakpoint-down(l) {
    display: grid;
  }

  /deep/ .arrow-container {
    @include media-breakpoint-down(l) {
      text-align: left;
      margin-left: 1rem;
      .arrow {
        width: 10px;
        height: 10px;
      }
    }
  }

  .the-header {
    position: sticky;
    top: 0;
    width: 100%;
    background: white;
    z-index: 15;
    background-image: radial-gradient(#2b4ab7 0%, #ffffff 5%);
    background-position: 0 0;
    background-size: 40px 40px;
  }

  /deep/ .description {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem 0 100px 4rem;

    .counter,
    .title {
      color: $blue-ferdio;
    }

    .counter {
      margin-bottom: 0.5em;
      font-family: 'niveau-grotesk-light';
    }

    .title {
      font-family: 'niveau-grotesk-bold';
      font-size: 1.1rem;
      line-height: 1.1em;
    }

    .text {
      font-family: 'jeff-script-regular';
      color: #aa9d9c;
      line-height: 1em;
      font-size: 1.1rem;
      margin: 1em 0;
    }

    .share {
      background: $blue-ferdio;
      width: 60px;
      text-align: center;
      color: white;
      font-size: 0.85em;
      padding: 0.2em 0.5em;
      .icon {
        display: none;
      }
    }

    @include media-breakpoint-down(sm) {
      max-height: 200px;
    }
    @include media-breakpoint-down(l) {
      display: block;
      text-align: right;
      padding: 2rem 4rem;
      position: sticky;
      top: 0;
      .share {
        margin-left: auto;
      }
    }
  }

  /deep/ .page-container {
    @include media-breakpoint-down(l) {
      grid-template-columns: 100%;
      grid-template-rows: auto 120px;
      height: 100%;

      .description {
        grid-row: 2;
        grid-column: 1;
        text-align: left;
        position: relative;
        padding: 0;
        margin: 0;
        padding-left: 3rem;
        max-height: 120px;

        .share {
          position: absolute;
          right: 0;
          bottom: 0%;
          height: 2rem;
          width: 2rem;

          .label {
            display: none;
          }
          .icon {
            display: inline;
          }
        }
      }
      .chart-container {
        grid-row: 1;
        grid-column: 1;
        display: flex;
      }
    }
  }
}

div {
  @include max-sized;
  margin: auto;
}
</style>