<template>
  <div class="header-container container">
    <div class="row px-0 py-2 py-lg-4 py-md-3">
      <div class="col-sm-1">
        <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
      </div>
      <div class="col-sm-10">
        <app-logo class="header-logo" />
      </div>
      <div class="col-sm-1"></div>
    </div>
  </div>
</template>

<script>
import AppLogo from '@/components/AppLogo'
import TheSideNavToggle from '@/components/Navigation/TheSideNavToggle'

export default {
  name: 'TheHeader',
  components: {
    TheSideNavToggle,
    AppLogo
  }
}
</script>

<style lang='scss' scoped>
.header-container > .row {
  flex-wrap: unset;
  min-height: 60px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
