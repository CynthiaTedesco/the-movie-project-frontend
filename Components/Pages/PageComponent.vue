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
  background-image: radial-gradient(#2b4ab7 0%, #ffffff 5%);
  background-position: 0 0;
  background-size: 40px 40px;
  position: relative;

  // .the-header {
  //   position: fixed;
  //   top: 0;
  //   width: 100%;
  //   background: white;
  //   z-index: 15;
  //   background-image: radial-gradient(#2b4ab7 0%, #ffffff 5%);
  //   background-position: 0 0;
  //   background-size: 40px 40px;
  // }
}
div {
  @include max-sized;
  margin: auto;
}
.container {
  div {
    max-width: 1118px;
    margin: auto;
  }

  display: flex;
  justify-content: center;
  align-items: top;
  text-align: center;
  background-color: $white;
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
    font-family: 'le-havre-rounded-w00-regular';
  }

  .title {
    font-family: 'maax-rounded-bold';
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
@include media-breakpoint-down(l) {
  /deep/ .page-container {
    grid-template-columns: 100%;
    grid-template-rows: minmax(130px, auto) auto;
  }
}
</style>