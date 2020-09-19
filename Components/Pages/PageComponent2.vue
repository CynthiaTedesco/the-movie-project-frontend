<template>
  <div class="inner-page page">
    <NavigationArrow class="blue-ferdio" @loadPrevious="loadPrevious" />
    <TheHeader @menuToggle="displayMenu =!displayMenu">
      <span v-html="current.header"></span>
    </TheHeader>
    <TheMenu :show="displayMenu" @close="displayMenu=false" />
    <section :id="current.keyword" class="page-container">
      <InnerPageDescription
        :question="current.question || '-'"
        :page-key="current.key || '-'"
        :text="theAnswer"
      />
      <slot>
        <!-- <Bubbles
            ref="bubbles"
            v-if="groups && groups.length"
            :movies="movies"
            :groups="groups"
            :attr="keyword"
            :singleKeyword="singleKeyword"
            :hasMany="hasMany"
        />-->
      </slot>
    </section>
    <NavigationArrow class="blue-ferdio" :to-next-page="true" @loadNext="loadNext" />
  </div>
</template>

<script>
import TheHeader from "@/Components/Navigation/TheHeader";
import TheMenu from "@/Components/Navigation/TheMenu";
import NavigationArrow from "@/Components/Arrows/NavigationArrow.vue";
import InnerPageDescription from "@/Components/InnerPageDescription";
import MENUITEMS from "@/constants/menuItems.js";
import EventBus from "@/assets/js/eventBus.js";
import { customKey } from "@/assets/js/helpers.js";
import { mapGetters } from "vuex";

export default {
  components: { TheHeader, TheMenu, NavigationArrow, InnerPageDescription },
  data() {
    return {
      displayMenu: false,
      current: {},
    };
  },
  props: {
    // next: {
    //   type: String,
    //   required: true
    // },
    navigate: {
      type: String,
    },
    params: {
      type: Object,
      required: true,
    },
  },
  created() {
    EventBus.$on("loadSpecificPage", this.loadSpecificPage);
  },
  mounted() {
    this.current = this.params;
  },
  computed: {
    ...mapGetters(["simulation"]), //TODO check if I still need this
    ...mapGetters(["winners"]),
    nextPage() {
      return MENUITEMS.find((mi) => mi.order === this.current.order + 1);
    },
    previousPage() {
      return MENUITEMS.find((mi) => mi.order === this.current.order - 1);
    },
    theAnswer() {
      if (this.current.answer) {
        const winnerKey = customKey(
          this.current.keyword,
          this.current.singleKeyword
        );
        const winner = this.winners[winnerKey].toLowerCase();
        return this.current.answer.replace("{winner}", winner);
      }

      return "...";
    },
  },
  methods: {
    loadPrevious() {
      if (this.previousPage) {
        const target = Object.assign({}, this.previousPage);
        this.current = this.previousPage;
        this.$emit("reload", target);
      } else {
        EventBus.$emit("scrollToTarget", "top-movies");
      }
    },
    loadNext() {
      if (this.nextPage && this.nextPage.key !== "ResultsPage") {
        const target = Object.assign({}, this.nextPage);
        this.current = this.nextPage;
        this.$emit("reload", target);
      } else {
        EventBus.$emit("scrollToTarget", "results");
      }
    },
    loadSpecificPage({ target, innerTarget }) {
      switch (target) {
        case "top-movies":
          EventBus.$emit("scrollToTarget", "top-movies");
          break;
        case "results":
          EventBus.$emit("scrollToTarget", "results");
          break;
        case "inner-page":
          this.current = innerTarget;
          this.$emit("reload", innerTarget);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";
.inner-page {
  background-image: radial-gradient(#2b4ab7 0%, #ffffff 5%);
  background-position: 0 0;
  background-size: 40px 40px;
  position: relative;

  @include media-breakpoint-down(l) {
    display: grid;
    grid-template-rows: 100px 0 auto;
  }

  /deep/ .arrow-container {
    @include media-breakpoint-down(l) {
      text-align: left;
      margin-left: 1rem;
      .arrow {
        width: 10px;
        height: 10px;
      }
    }
  }

  .the-header {
    position: sticky;
    top: 0;
    width: 100%;
    background: white;
    z-index: 15;
    background-image: radial-gradient(#2b4ab7 0%, #ffffff 5%);
    background-position: 0 0;
    background-size: 40px 40px;
  }

  /deep/ .description {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem 0 100px 4rem;

    .counter,
    .title {
      color: $blue-ferdio;
    }

    .counter {
      margin-bottom: 0.5em;
      font-family: "niveau-grotesk-light";
    }

    .title {
      font-family: "niveau-grotesk-bold";
      font-size: 1.1rem;
      line-height: 1.1em;
    }

    .text {
      font-family: "jeff-script-regular";
      color: #aa9d9c;
      line-height: 1em;
      font-size: 1.1rem;
      margin: 1em 0;
    }

    .share {
      background: $blue-ferdio;
      width: 60px;
      text-align: center;
      color: white;
      font-size: 0.85em;
      padding: 0.2em 0.5em;
      .icon {
        display: none;
      }
    }

    @include media-breakpoint-down(sm) {
      max-height: 200px;
    }
    @include media-breakpoint-down(l) {
      display: block;
      text-align: right;
      padding: 2rem 4rem;
      position: sticky;
      top: 0;
      .share {
        margin-left: auto;
      }
    }
  }

  /deep/ .page-container {
    @include media-breakpoint-down(l) {
      grid-template-columns: 100%;
      grid-template-rows: auto 140px;
      height: calc(100vh - 100px);

      .description {
        grid-row: 2;
        grid-column: 1;
        text-align: left;
        position: relative;
        padding: 0;
        margin: 0;
        padding-left: 3rem;
        max-height: 140px;

        .share {
          position: absolute;
          right: 0;
          bottom: 0%;
          height: 2rem;
          width: 2rem;

          .label {
            display: none;
          }
          .icon {
            display: inline;
          }
        }
      }
      .chart-container {
        grid-row: 1;
        grid-column: 1;
        display: flex;
      }
    }
  }
}

div {
  @include max-sized;
}
</style>