<template>
  <Restrictions :data-index="page.order" :question="page.question" navigate="/release/poster" />
</template>

<script>
import Restrictions from "@/Components/Pages/Restrictions";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "RestrictionPage",
  components: { Restrictions },
  computed: {
    page() {
      return MENUITEMS[16];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
