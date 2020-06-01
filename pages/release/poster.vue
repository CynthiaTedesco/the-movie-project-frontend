<template>
  <Posters :data-index="page.order" :question="page.question" navigate="/results" />
</template>

<script>
import Posters from "@/Components/Pages/Posters";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "PosterPage",
  components: { Posters },
  computed: {
    page() {
      return MENUITEMS[17];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
