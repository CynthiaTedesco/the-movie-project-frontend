<template>
  <CategoriesSmall
    ref="chart"
    v-if="!axis && display==='small'"
    :movies="movies"
    :groups="groups"
    :hasMany="hasMany"
    :keywordFn="keywordFn"
    :singleKeyword="singleKeyword"
    :attr="attr"
  />

  <CategoriesLarge
    ref="chart"
    v-else-if="!axis && display!=='small'"
    :movies="movies"
    :groups="groups"
    :hasMany="hasMany"
    :keywordFn="keywordFn"
    :singleKeyword="singleKeyword"
    :attr="attr"
  />

  <AxisChartComponent
    ref="chart"
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
import EventBus from "@/assets/js/eventBus.js";
import { isMobile, isTablet } from "@/assets/js/helpers.js";

export default {
  name: "bubbles",
  components: {
    CategoriesSmall,
    CategoriesLarge,
    AxisChartComponent,
  },
  data() {
    return {
      display: "large",
      doit: false,
    };
  },
  props: {
    movies: Array,
    groups: Array,
    attr: String,
    hasMany: Boolean,
    singleKeyword: String,
    keywordFn: Function,
    axis: {
      type: Boolean,
      default: false,
    },
  },
  watch:{
    groups(){
      this.$nextTick(()=>{
        this.$refs.chart.restartSimulation();
      });
    }
  },
  beforeMount() {
    this.display = this.calculateDisplay();
  },
  mounted() {
    window.addEventListener("resize", this.eventListenerFn);
    EventBus.$on("restartSimulation", this.restartSimulation);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resized);
  },
  methods: {
    // restartSimulation(params){
    //   debugger;
    //   this.$refs.chart.restartSimulation(params);
    // },
    eventListenerFn() {
      clearTimeout(this.doit);
      this.doit = setTimeout(this.resized, 300);
    },
    calculateDisplay() {
      const width = document.documentElement.clientWidth;
      if (isMobile() || isTablet()) {
        return "small";
      }

      return "large";
    },
    async resized() {
      if (this.axis) {
        this.$nextTick(() => {
          this.$refs.chart.setDimensions();
        });
      } else {
        //TODO decide if we need a different visualizacion for axis on mobile
        this.display = this.calculateDisplay();
        const onMobile = await this.$store.getters.onMobile;
        const onTablet = await this.$store.getters.onTablet;

        if (onMobile !== isMobile()) {
          this.$store.dispatch("setIsMobile", isMobile());
        } else if (onTablet !== isTablet()) {
          this.$store.dispatch("setIsTablet", isTablet());
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/common.scss";
svg {
  overflow: visible;
}
</style>