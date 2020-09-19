<template>
  <div class="menu-container container">
    <div v-if="show" class="menu-backdrop" @click="$emit('close')"></div>
    <transition name="slide-side">
      <div v-if="show" class="menu menu-list" @click="$emit('close')">
        <MenuGroup v-for="menuItem in menuItems" :key="menuItem.title" :item="menuItem" />
      </div>
    </transition>
  </div>
</template>

<script>
import MenuGroup from '@/Components/Navigation/MenuGroup.vue';
import MENUITEMS from "@/constants/menuItems.js";

export default {
  name: 'TheMenu',
  components: { MenuGroup },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuItems: [
        {
          route: '',
          title: 'Movies',
          subItems: [
            { title: 'menu.top-movies', target: 'top-movies' }
          ]
        },
        {
          route: '',
          title: 'Story',
          subItems: [
            { title: 'menu.story.universe', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === 'UniversePage') },
            { title: 'menu.story.genre', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === 'GenrePage') },
            { title: 'menu.story.origin', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === 'OriginPage') },
            { title: 'menu.story.series', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.script.language', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.story.leadGender', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.story.leadAge', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
          ]
        },
        {
          route: '',
          title: 'Production',
          subItems: [
            { title: 'menu.production.budget', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.production.directorGender', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.production.directorAge', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.production.country', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.production.cinematography', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.script.length', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.script.wordCount', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
          ]
        },
        {
          route: '',
          title: 'Release',
          subItems: [
            { title: 'menu.release.month', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.release.distribution', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.release.restrictions', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
            { title: 'menu.release.poster', target: 'inner-page', innerTarget: MENUITEMS.find((a) => a.key === '') },
          ]
        },
        {
          route: '',
          title: 'Results',
          subItems: [
            { title: 'menu.results', target: 'results' }
          ]
        },
      ]
    }
  },
}
</script>

<style scoped>
.close {
  font-size: 40px;
  opacity: 0.6;
  padding: 1rem;
}
.menu-container {
  width: 100%;
}

.menu-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.menu {
  /* height: 100%; */
  width: 90vw;
  background-color: white;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 30px;
}

@media (min-width: 768px) {
  .menu {
    width: 60vw;
  }
}

@media (min-width: 1024px) {
  .menu {
    width: 49vw;
  }
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-100%);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 20px 0;
}

.nav-item a {
  text-decoration: none;
  color: black;
  font-size: 3rem;
}

ul.navbar-nav.social {
  margin-left: 1.2rem;
  flex-direction: row;
}
.navbar-nav.social .nav-item {
  margin: 0 0 0 0.8rem;
}
.navbar-nav.social .nav-item a {
  font-size: 24px;
}
.menu-list {
  display: flex;
  justify-content: space-between;
  max-width: 684px;
  margin-top: 5rem;
  margin-left: 10rem;
  border: 1px solid gray;
}
.footer nav.navbar {
  justify-content: flex-end;
}
.nav-item a:hover,
.nav-item a:active {
  color: red;
}
</style>
