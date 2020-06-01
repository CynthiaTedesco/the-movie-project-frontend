<template>
  <LeadActorGenders :data-index="page.order" :question="page.question" navigate="/story/lead_actor_age" />
</template>

<script>
import LeadActorGenders from "@/Components/Pages/LeadActorGenders";
import MENUITEMS from "@/constants/menuItems";

export default {
  name: "LeadActorGenderPage",
  components: { LeadActorGenders },
  computed: {
    page() {
      return MENUITEMS[5];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
