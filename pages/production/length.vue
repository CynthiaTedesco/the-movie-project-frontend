<template>
  <Lengths :data-index="page.order" :question="page.question" navigate="/production/word_count" />
</template>

<script>
import Lengths from "@/Components/Pages/Lengths";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "LengthPage",
  components: { Lengths },
  computed: {
    page() {
      return MENUITEMS[12];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
