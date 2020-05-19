<template>
  <section class="page-container page">
    <InnerPageDescription
      question="When does the movie should take place?"
      pageKey="lala"
      :text="text"
    />
    <Bubbles
      v-if="groups.length"
      :movies="movies"
      :groups="groups"
      attr="set_in_time"
      :hasMany="hasMany"
    />
  </section>
</template>

<script>
import bubblePage from '@/mixins/bubblePage.js';
import Bubbles from "@/Components/Charts/Bubbles";
import InnerPageDescription from "@/Components/InnerPageDescription";

export default {
  name: 'SettingTimePage',
  layout: 'innerPage',
  mixins: [bubblePage],
  components: { InnerPageDescription, Bubbles },
  data () {
    return {
      data: [],
      keyword: 'set_in_time',
      hasMany: false
    }
  },
  computed: {
    text () {
      if (this.groups.length) {
        const name = this.groups[0][0];
        return `You cannot go wrong with a movie set in ${name.toLowerCase()} times!`;
      }

      return '';
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  height: calc(100vh - 100px);
}
</style>