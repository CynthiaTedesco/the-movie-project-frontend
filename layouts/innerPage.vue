<template>
  <div class="bubbles-page">
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
  padding: 2rem 0 3rem 4rem;

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
}
</style>