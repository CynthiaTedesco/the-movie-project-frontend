<template>
  <div>
    <ul class="nav-list" @click="$emit('close')">
      <li v-for="menuItem in menuItems" :key="menuItem.title" class="nav-item">
        <nuxt-link :to="menuItem.route">{{ $t(menuItem.title) }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "menu-item",
  props: {
    item: Object
  }
};
</script>

<style lang="scss" scoped>
</style>