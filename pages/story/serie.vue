<template>
  <Series :data-index="page.order" :question="page.question" navigate="/story/language" />
</template>

<script>
import Series from "@/Components/Pages/Series";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "SeriePage",
  components: { Series },
  computed: {
    page() {
      return MENUITEMS[3];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
