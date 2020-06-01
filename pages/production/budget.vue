<template>
  <Budgets :data-index="page.order" :question="page.question" navigate="/production/director_gender" />
</template>

<script>
import Budgets from "@/Components/Pages/Budgets";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "BudgetPage",
  components: { Budgets },
  computed: {
    page() {
      return MENUITEMS[7];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
