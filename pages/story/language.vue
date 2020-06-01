<template>
  <Languages :data-index="page.order" :question="page.question" navigate="/story/lead_actor_gender" />
</template>

<script>
import Languages from "@/Components/Pages/Languages";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "LanguagePage",
  components: { Languages },
  computed: {
    page() {
      return MENUITEMS[4];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
