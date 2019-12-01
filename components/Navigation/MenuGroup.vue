<template>
  <div class="menu-group">
    <div class="title">{{ item.title }}</div>
    <ul class="list">
      <li v-for="subItem in item.subItems" :key="subItem.title">
        <a :href="subItem.route">{{ $t(subItem.title) }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          route: '#',
          title: 'a title',
          subItems: [{ route: '#', title: 'a subitem title' }]
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/common.scss';
.list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
  font-size: 90%;
  line-height: 1.8rem;

  a, a:hover, a:focus {
    color: #989898;
  }
}
.title {
  color: $blue-ferdio;
  font-weight: bold;
}
</style>
