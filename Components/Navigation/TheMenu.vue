<template>
  <div class="menu-container container">
    <div v-if="show" class="menu-backdrop" @click="$emit('close')"></div>
    <transition name="slide-side">
      <div v-if="show" class="menu-content menu">
        <div class="menu-header">
          <div class="title">
            <div>{{$t('howToMake')}}</div>
            <div>{{$t('aBlockbuster')}}</div>
          </div>
          <CloseBtn />
        </div>
        <div class="menu-list" @wheel.stop>
          <MenuGroup
            v-for="menuItem in menuItems"
            :key="menuItem.title"
            :item="menuItem"
            @close="$emit('close')"
            :active="active"
          />
        </div>
        <div class="menu-footer">
          <img src="@/assets/images/byFerdio-gray.png" alt="tap-logo" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MenuGroup from "@/Components/Navigation/MenuGroup.vue";
import CloseBtn from "@/Components/UI/CloseBtn";
import MENUITEMS from "@/constants/menuItems.js";

export default {
  name: "TheMenu",
  components: { MenuGroup, CloseBtn },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    active: String,
  },
  data() {
    return {
      menuItems: [
        {
          route: "",
          title: "Movies",
          subItems: [{ title: "menu.top-movies", target: "top-movies" }],
        },
        {
          route: "",
          title: "Story",
          subItems: [
            {
              title: "menu.story.universe",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "UniversePage"),
            },
            {
              title: "menu.story.genre",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "GenrePage"),
            },
            {
              title: "menu.story.origin",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "OriginPage"),
            },
            {
              title: "menu.story.series",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "SeriePage"),
            },
            {
              title: "menu.script.language",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "LanguagePage"),
            },
            {
              title: "menu.story.leadGender",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "LeadActorGenderPage"),
            },
            {
              title: "menu.story.leadAge",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "LeadActorAgePage"),
            },
          ],
        },
        {
          route: "",
          title: "Production",
          subItems: [
            {
              title: "menu.production.budget",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "BudgetPage"),
            },
            {
              title: "menu.production.directorGender",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "DirectorGenderPage"),
            },
            {
              title: "menu.production.directorAge",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "DirectorAgePage"),
            },
            {
              title: "menu.production.country",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "CountryPage"),
            },
            {
              title: "menu.production.cinematography",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "CinematographyPage"),
            },
            {
              title: "menu.script.length",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "LengthPage"),
            },
            {
              title: "menu.script.wordCount",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "WordCountPage"),
            },
          ],
        },
        {
          route: "",
          title: "Release",
          subItems: [
            {
              title: "menu.release.month",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "ReleaseMonthPage"),
            },
            {
              title: "menu.release.distribution",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "DistributionCompaniesPage"),
            },
            {
              title: "menu.release.restrictions",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "RestrictionPage"),
            },
            {
              title: "menu.release.poster",
              target: "inner-page",
              innerTarget: MENUITEMS.find((a) => a.key === "PosterPage"),
            },
          ],
        },
        {
          route: "",
          title: "Results",
          subItems: [{ title: "menu.results", target: "results" }],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/common.scss";

.menu-container {
  width: 100%;

  .menu-backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
  }

  .menu-content {
    background-color: $white;
    z-index: 10000;
    position: fixed;
    top: 0;
    box-sizing: border-box;
    padding: 30px;
    right: 0;
    border: 1px solid gray;
    height: 100vh;
    width: 100vw;
    max-width: 500px;
    margin: 0;

    .menu-list {
      font-family: "VI-Lam-Anh";
      display: flex;
      flex-direction: column;
      padding: 2rem 0;
      justify-content: space-between;
      font-size: 22px;
      padding-left: 20px;
      line-height: 2em;
      height: calc(100vh - 100px);
      margin-right: -30px;
      overflow: auto;

      @include media-breakpoint-up(lg) {
        font-size: 1rem;
        flex-direction: row;
        padding: 0;
        line-height: 1em;
        height: auto;
        margin-right: 0;
      }
    }

    .menu-header {
      height: 100px;
      background: $blue;
      padding: 30px;
      margin-left: -30px;
      margin-right: -30px;
      margin-top: -30px;

      .title {
        font-family: "niveau-grotesk-bold";
        font-size: 20px;
        line-height: 1em;
        color: $white;
      }

      @include media-breakpoint-up(lg) {
        display: none;
      }
    }

    .menu-footer {
      position: fixed;
      bottom: 20px;
      right: 20px;

      img {
        width: 100px;
      }

      @include media-breakpoint-up(lg) {
        display: none;
      }
    }
    @media (min-width: 768px) {
      width: 60vw;
    }
    @media (min-width: 1026px) {
      width: 49vw;
      left: 0;
      right: unset;
    }

    @media (min-width: 1024px) {
      height: auto;
      width: 90vw;
      max-width: 684px;
      margin-top: 5rem;
      margin-left: 10rem;
    }
  }
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(100%);
  @media (min-width: 1024px) {
    transform: translateX(-100%);
  }
}
</style>
