<template>
  <Origins :data-index="page.order" :question="page.question" navigate="/story/serie" />
</template>

<script>
import Origins from "@/Components/Pages/Origins";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "OriginPage",
  components: { Origins },
  computed: {
    page() {
      return MENUITEMS[2];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
