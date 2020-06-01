<template>
  <Cinematographies :data-index="page.order" :question="page.question" navigate="/production/length" />
</template>

<script>
import Cinematographies from "@/Components/Pages/Cinematographies";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "CinematographyPage",
  components: { Cinematographies },
  computed: {
    page() {
      return MENUITEMS[11];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
