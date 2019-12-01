<template>
  <div class="menu-container container">
    <div v-if="show" class="menu-backdrop" @click="$emit('close')"></div>
    <transition name="slide-side">
        <div v-if="show" class="menu menu-list">
          <MenuGroup v-for="menuItem in menuItems" :key="menuItem.title" :item="menuItem" />
        </div>
    </transition>
  </div>
</template>

<script lang="ts">
import MenuGroup from '@/components/Navigation/MenuGroup.vue';

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
          title: 'Story',
          subItems: [
            { route: 'story/genre', title: 'menu.story.genre' },
            { route: 'story/leadAge', title: 'menu.story.leadAge' },
            { route: 'story/leadGender', title: 'menu.story.leadGender' },
            { route: 'story/mainCharacter', title: 'menu.story.mainCharacter' },
            { route: 'story/origin', title: 'menu.story.origin' },
            { route: 'story/settingTime', title: 'menu.story.time' },
            { route: 'story/settingPlace', title: 'menu.story.place' },
            { route: 'story/plot', title: 'menu.story.plot' }
          ]
        },
        {
          route: '',
          title: 'Script',
          subItems: [
            { route: 'script/language', title: 'menu.script.language' },
            { route: 'script/length', title: 'menu.script.length' },
            { route: 'script/wordCount', title: 'menu.script.wordCount' },
          ]
        },
        {
          route: '',
          title: 'Production',
          subItems: [
            { route: 'production/budget', title: 'menu.production.budget' },
            { route: 'production/directorAge', title: 'menu.production.directorAge' },
            { route: 'production/directorGender', title: 'menu.production.directorGender' },
            { route: 'production/country', title: 'menu.production.country' },
          ]
        },
        {
          route: '',
          title: 'Release',
          subItems: [
            { route: 'release/month', title: 'menu.release.month' },
            { route: 'release/distributionCompany', title: 'menu.release.distribution' },
            { route: 'release/restrictions', title: 'menu.release.restrictions' },
            { route: 'release/poster', title: 'menu.release.poster' },
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
  height: 100%;
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
