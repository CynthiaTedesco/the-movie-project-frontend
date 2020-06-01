<template>
  <LeadActorAges :data-index="page.order" :question="page.question" navigate="/production/budget" />
</template>

<script>
import LeadActorAges from "@/Components/Pages/LeadActorAges";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "LeadActorAgePage",
  components: { LeadActorAges },
  computed: {
    page() {
      return MENUITEMS[6];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
