<template>
  <div>
    <TheHeader @menuToggle="displayMenu =!displayMenu" />
    <TheMenu :show="displayMenu" @close="displayMenu=false" />
    <nuxt />
    <!-- <TheFooter /> -->
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader';
// import TheFooter from '@/components/Navigation/TheFooter';
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
