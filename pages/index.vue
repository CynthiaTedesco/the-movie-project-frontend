<template>
  <div class="presentation">
    <div class="presentation-content">
      <div class="images">
        <RandomMovieBubble />
      </div>
      <div class="text">
        <div class="how-to">
          {{ $t('howToMake') }}
          <br />
          {{ $t('aBlockbuster') }}
        </div>
        <div class="step-by-step">{{ $t('stepByStep') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RandomMovieBubble from '@/components/RandomMovieBubble.vue';

export default {
  components: { RandomMovieBubble },
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/common.scss';
.presentation {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(#d0d0d0 0%, #2b4ab7 5%);
  background-position: 0 0;
  background-size: 40px 40px;
}
.presentation-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: $clear;
}
.text {
  display: flex;
  flex-direction: column;
  color: white;

  .how-to {
    font-size: 50px;
    font-weight: 900;
    line-height: 1;
  }

  .step-by-step {
    font-family: 'jeff-script-regular';
    font-size: 30px;
  }
}
</style>
