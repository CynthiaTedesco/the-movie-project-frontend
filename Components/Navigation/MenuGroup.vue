<template>
  <div class="menu-group">
    <div class="title">{{ item.title }}</div>
    <ul class="list">
      <li v-for="subItem in item.subItems" :key="subItem.title" @click="menuClick(subItem)" class="tmp-item">
          {{ $t(subItem.title) }}
      </li>
    </ul>
  </div>
</template>

<script>
import EventBus from "@/assets/js/eventBus.js";

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
  },
  methods:{
    menuClick(target){
      EventBus.$emit("loadSpecificPage", target);
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

  li, li:hover, li:focus {
    cursor: pointer;
    color: #989898;
  }
}
.title {
  color: $blue-ferdio;
  font-weight: bold;
}
</style>
