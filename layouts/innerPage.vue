<template>
  <div class="">
    <TheHeader @menuToggle="displayMenu =!displayMenu" />
    <TheMenu :show="displayMenu" @close="displayMenu=false" />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader';
import TheMenu from '@/components/Navigation/TheMenu';

export default {
  components: { TheHeader, TheMenu },
  middleware: ['device', 'movies'],
  data () {
    return {
      displayMenu: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/common.scss';
div {
  max-width: 1500px;
  margin: auto;
}
.page-container {
  min-height: 80vh;
  @include media-breakpoint-up(lg) {
    max-height: 83vh;
  }
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
</style>