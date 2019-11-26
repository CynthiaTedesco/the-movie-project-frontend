<template>
  <div class="sidenav-container container">
    <div v-if="show" class="sidenav-backdrop" @click="$emit('close')"></div>
    <transition name="slide-side">
      <div v-if="show" class="sidenav row">
        <div class="sidenav-close-icon">
          <button type="button" class="close" aria-label="Close" @click="$emit('close')">
            <i class="icon-close"></i>
          </button>
        </div>
        <div class="sidenav-list">
          <ul class="nav-list" @click="$emit('close')">
            <li v-for="menuItem in settings.menuItems" :key="menuItem.title" class="nav-item">
              <nuxt-link :to="menuItem.route">
                {{ $t(menuItem.title) }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div v-if="settings.showSocial" class="sidenav-footer footer">
          <nav class="navbar">
            <span>Follow us:</span>
            <ul class="navbar-nav social">
              <li
                v-for="socialItem in settings.socialItems"
                :key="socialItem.name"
                class="nav-item"
              >
                <a :href="socialItem.href" target="_blank">
                  <i :class="socialItem.icon"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

interface MenuSettings {
  menuItems: object;
  showSocial: boolean;
  socialItems: object
}

export default Vue.extend({
  name: 'TheSidenav',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Object,
      required: false,
      default: () => {
        return {
          menuItems: [
            { route: '/shop', title: 'menu.shop' },
            { route: '/science', title: 'menu.science' },
            { route: '/about', title: 'menu.about' },
            { route: '/help', title: 'menu.help' }
          ],
          showSocial: true,
          socialItems: [
            {
              name: 'facebook',
              icon: 'icon-facebook',
              href: 'https://www.facebook.com/CopenhagenGrooming'
            },
            {
              name: 'instagram',
              icon: 'icon-instagram',
              href: 'https://www.instagram.com/copenhagengrooming'
            },
            {
              name: 'youtube',
              icon: 'icon-youtube',
              href: 'https://www.youtube.com/channel/UCsLnoe_Fw2Dq-ffApPJvmSQ'
            }
          ]
        }
      }
    } as PropOptions<MenuSettings>
  }
})
</script>

<style scoped>
.close {
  font-size: 40px;
  opacity: 0.6;
  padding: 1rem;
}
.sidenav-container {
  height: 100%;
  width: 100%;
}

.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.sidenav {
  height: 100%;
  width: 90vw;
  background-color: white;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 30px;
}

.sidenav.row {
  display: grid;
  grid-template-rows: 1fr 3fr 40px;
  max-width: 684px;
}

@media (min-width: 768px) {
  .sidenav {
    width: 60vw;
  }
}

@media (min-width: 1024px) {
  .sidenav {
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
.sidenav-list {
  margin-left: 5rem;
}
.footer nav.navbar {
  justify-content: flex-end;
}
.nav-item a:hover,
.nav-item a:active {
  color: red;
}
</style>
