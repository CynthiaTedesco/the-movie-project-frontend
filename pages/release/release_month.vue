<template>
  <Months :data-index="page.order" :question="page.question" navigate="/release/distribution_company" />
</template>

<script>
import Months from "@/Components/Pages/Months";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "ReleaseMonthPage",
  components: { Months },
  computed: {
    page() {
      return MENUITEMS[14];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
