<template>
  <div class="the-header header-container container">
    <div class="row px-0 py-2 py-lg-4 py-md-3">
      <div class="col-sm-9 the-header__left">
        <div class="how-to-make">How to make a blockbuster</div>
        <TheMenuToggle @toggle="$emit('menuToggle')" />
      </div>
      <div class="col-sm-3">
        <app-logo class="header-logo" />
      </div>
      <!-- <div class="col-sm-1"></div> -->
    </div>
  </div>
</template>

<script>
import AppLogo from '@/components/AppLogo'
import TheMenuToggle from '@/components/Navigation/TheMenuToggle'

export default {
  name: 'TheHeader',
  components: {
    TheMenuToggle,
    AppLogo
  }
}
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
    padding: 1rem 0;
}
.header-logo {
  margin-left: auto;
}
.how-to-make {
    color: $blue-ferdio;
    font-weight: bolder;
    font-size: 20px;
    white-space: nowrap;
}
.the-header__left {
    display: flex;
    flex-direction: column;

    @include media-breakpoint-up(md) {
      flex-direction: row;
    }

}
</style>
