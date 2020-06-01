<template>
  <Countries :data-index="page.order" :question="page.question" navigate="/production/cinematography" />
</template>

<script>
import Countries from "@/Components/Pages/Countries";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "CountryPage",
  components: { Countries },
  computed: {
    page() {
      return MENUITEMS[10];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
