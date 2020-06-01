<template>
  <Words :data-index="page.order" :question="page.question" navigate="/release/release_month" />
</template>

<script>
import Words from "@/Components/Pages/Words";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "WordPage",
  components: { Words },
  computed: {
    page() {
      return MENUITEMS[14];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
