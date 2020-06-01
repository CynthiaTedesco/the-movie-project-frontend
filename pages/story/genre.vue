<template>
  <Genres :data-index="page.order" :question="page.question" />
</template>

<script>
import Genres from "@/Components/Pages/Genres";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "GenrePage",
  components: { Genres },
  computed: {
    page() {
      return MENUITEMS[1];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
