<template>
  <div class="menu-group">
    <div class="title">{{ item.title }}</div>
    <ul class="list">
      <li
        v-for="subItem in item.subItems"
        :key="subItem.title"
        @click.stop="menuClick(subItem)"
        :class="{ active: isActive(subItem) }"
      >
        <span>{{ $t(subItem.title) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import EventBus from "@/assets/js/eventBus.js";

export default {
  props: {
    active: String,
    item: {
      type: Object,
      default: () => {
        return {
          route: "#",
          title: "a title",
          subItems: [{ route: "#", title: "a subitem title" }],
        };
      },
    },
  },
  methods: {
    menuClick(target) {
      this.$emit("close");
      EventBus.$emit("loadSpecificPage", target);
    },
    isActive(subItem) {
      if (subItem.innerTarget) {
        return subItem.innerTarget.key === this.active;
      } else {
        return subItem.target === this.active;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";
.list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
  font-size: 90%;
  line-height: 1.8rem;

  li {
    margin-bottom: 0.4em;

    &.active {
      color: $blue;

      span {
        border-bottom: 1px solid $blue;
      }
    }
  }
  li,
  li:hover,
  li:focus {
    cursor: pointer;
    color: #989898;
  }
}
.title {
  color: $blue;
  font-weight: bold;
}
</style>
