<template>
  <CategoriesSmall
    v-if="!axis && display==='small'"
    :movies="movies"
    :groups="groups"
    :hasMany="hasMany"
    :singleKeyword="singleKeyword"
    :attr="attr"
  />

  <CategoriesLarge
    v-else-if="!axis && display!=='small'"
    :movies="movies"
    :groups="groups"
    :hasMany="hasMany"
    :singleKeyword="singleKeyword"
    :attr="attr"
  />

  <AxisChartComponent
    ref="axisChart"
    v-else-if="axis"
    :movies="movies"
    :groups="groups"
    :hasMany="hasMany"
    :singleKeyword="singleKeyword"
    :attr="attr"
  />
</template>

<script>
const d3 = require("d3");
import CategoriesSmall from "@/Components/Layouts/CategoriesSmall.vue";
import CategoriesLarge from "@/Components/Layouts/CategoriesLarge.vue";
import AxisChartComponent from "@/Components/Layouts/AxisChartComponent.vue";
import { isMobile } from "@/assets/js/helpers.js";

export default {
  name: "bubbles",
  components: {
    CategoriesSmall,
    CategoriesLarge,
    AxisChartComponent
  },
  data() {
    return {
      display: "large",
      doit: false
    };
  },
  props: {
    movies: Array,
    groups: Array,
    attr: String,
    hasMany: Boolean,
    singleKeyword: String,
    axis: {
      type: Boolean,
      default: false
    }
  },
  beforeMount() {
    this.display = this.calculateDisplay();
  },
  mounted() {
    window.addEventListener("resize", this.eventListenerFn);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resized);
  },
  methods: {
    eventListenerFn() {
      clearTimeout(this.doit);
      this.doit = setTimeout(this.resized, 300);
    },
    calculateDisplay() {
      const width = document.documentElement.clientWidth;
      if (isMobile()) {
        return "small";
      }

      return "large";
    },
    async resized() {
      if (this.axis) {
        this.$nextTick(() => {
          this.$refs.axisChart.setDimensions();
        });
      } else {
        //TODO decide if we need a different visualizacion for axis on mobile
        this.display = this.calculateDisplay();
        if ((await this.$store.getters.onMobile) !== isMobile()) {
          this.$store.dispatch("setIsMobile", isMobile());
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/common.scss";
svg {
  overflow: visible;
}
</style>