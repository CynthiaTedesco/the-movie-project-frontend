<template>
  <DirectorGenders :data-index="page.order" :question="page.question" navigate="/production/director_age" />
</template>

<script>
import DirectorGenders from "@/Components/Pages/DirectorGenders";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "DirectorGenderPage",
  components: { DirectorGenders },
  computed: {
    page() {
      return MENUITEMS[8];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
