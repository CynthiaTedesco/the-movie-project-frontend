<template>
  <Universes :data-index="page.order" :question="page.question" navigate="/story/genre" />
</template>

<script>
import Universes from "@/Components/Pages/Universes";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "UniversePage",
  components: { Universes },
  computed: {
    page() {
      return MENUITEMS[0];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
