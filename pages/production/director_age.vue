<template>
  <DirectorAges :data-index="page.order" :question="page.question" navigate="/production/country" />
</template>

<script>
import DirectorAges from "@/Components/Pages/DirectorAges";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "DirectorAgePage",
  components: { DirectorAges },
  computed: {
    page() {
      return MENUITEMS[9];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
