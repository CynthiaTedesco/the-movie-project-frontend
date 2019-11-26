<template>
  <section class="container">
    <div>
      <app-logo />
      <h1 class="title">{{ $t('title') }}</h1>
      <h2 class="subtitle">{{ $t('subtitle') }}</h2>
      <button class="btn btn-primary test-button">Test</button>
      <div style="margin-top: 50px;">
        <b-button v-b-toggle.collapse-1 variant="primary">{{ btnText }}</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <p class="card-text">Collapse contents Here</p>
            <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
            <b-collapse id="collapse-1-inner" class="mt-2">
              <b-card>Hello!</b-card>
            </b-collapse>
          </b-card>
        </b-collapse>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  data () {
    const btnText: string = 'Toggle Collapse from variable'
    return {
      btnText
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/common.scss";

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: $white;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: $black;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: $black;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.test-button {
  animation: rotating 1.7s linear infinite;
}
</style>
