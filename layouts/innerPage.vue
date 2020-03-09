<template>
  <div>
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
  data () {
    return {
      displayMenu: false
    };
  }
};
</script>
<style lang="scss" scoped>
div {
  max-width: 1118px;
  margin: auto;
}
</style>