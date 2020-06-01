<template>
  <DistributionCompanies :data-index="page.order" :question="page.question" navigate="/release/restriction" />
</template>

<script>
import DistributionCompanies from "@/Components/Pages/DistributionCompanies";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "DistributionCompanyPage",
  components: { DistributionCompanies },
  computed: {
    page() {
      return MENUITEMS[15];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
