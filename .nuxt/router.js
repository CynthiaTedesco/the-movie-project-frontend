import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6aeb4234 = () => interopDefault(import('../pages/production/budget.vue' /* webpackChunkName: "pages/production/budget" */))
const _d11ec192 = () => interopDefault(import('../pages/production/country.vue' /* webpackChunkName: "pages/production/country" */))
const _2fffb318 = () => interopDefault(import('../pages/production/directorAge.vue' /* webpackChunkName: "pages/production/directorAge" */))
const _6ce1d15c = () => interopDefault(import('../pages/production/directorGender.vue' /* webpackChunkName: "pages/production/directorGender" */))
const _361c6fea = () => interopDefault(import('../pages/release/distributionCompany.vue' /* webpackChunkName: "pages/release/distributionCompany" */))
const _36d81551 = () => interopDefault(import('../pages/release/month.vue' /* webpackChunkName: "pages/release/month" */))
const _f2286f68 = () => interopDefault(import('../pages/release/poster.vue' /* webpackChunkName: "pages/release/poster" */))
const _75cfaa34 = () => interopDefault(import('../pages/release/restrictions.vue' /* webpackChunkName: "pages/release/restrictions" */))
const _d7767e96 = () => interopDefault(import('../pages/script/language.vue' /* webpackChunkName: "pages/script/language" */))
const _8d6a42fa = () => interopDefault(import('../pages/script/length.vue' /* webpackChunkName: "pages/script/length" */))
const _71fd0bd0 = () => interopDefault(import('../pages/script/wordCount.vue' /* webpackChunkName: "pages/script/wordCount" */))
const _25c2de82 = () => interopDefault(import('../pages/story/genre.vue' /* webpackChunkName: "pages/story/genre" */))
const _63070b42 = () => interopDefault(import('../pages/story/leadAge.vue' /* webpackChunkName: "pages/story/leadAge" */))
const _341e11ce = () => interopDefault(import('../pages/story/leadGender.vue' /* webpackChunkName: "pages/story/leadGender" */))
const _7efe74ef = () => interopDefault(import('../pages/story/mainCharacter.vue' /* webpackChunkName: "pages/story/mainCharacter" */))
const _794c3fb7 = () => interopDefault(import('../pages/story/origin.vue' /* webpackChunkName: "pages/story/origin" */))
const _6679b232 = () => interopDefault(import('../pages/story/plot.vue' /* webpackChunkName: "pages/story/plot" */))
const _270b5de8 = () => interopDefault(import('../pages/story/settingPlace.vue' /* webpackChunkName: "pages/story/settingPlace" */))
const _db1c6808 = () => interopDefault(import('../pages/story/settingTime.vue' /* webpackChunkName: "pages/story/settingTime" */))
const _6e74a3ab = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/production/budget",
    component: _6aeb4234,
    name: "production-budget___en"
  }, {
    path: "/production/country",
    component: _d11ec192,
    name: "production-country___en"
  }, {
    path: "/production/directorAge",
    component: _2fffb318,
    name: "production-directorAge___en"
  }, {
    path: "/production/directorGender",
    component: _6ce1d15c,
    name: "production-directorGender___en"
  }, {
    path: "/release/distributionCompany",
    component: _361c6fea,
    name: "release-distributionCompany___en"
  }, {
    path: "/release/month",
    component: _36d81551,
    name: "release-month___en"
  }, {
    path: "/release/poster",
    component: _f2286f68,
    name: "release-poster___en"
  }, {
    path: "/release/restrictions",
    component: _75cfaa34,
    name: "release-restrictions___en"
  }, {
    path: "/script/language",
    component: _d7767e96,
    name: "script-language___en"
  }, {
    path: "/script/length",
    component: _8d6a42fa,
    name: "script-length___en"
  }, {
    path: "/script/wordCount",
    component: _71fd0bd0,
    name: "script-wordCount___en"
  }, {
    path: "/story/genre",
    component: _25c2de82,
    name: "story-genre___en"
  }, {
    path: "/story/leadAge",
    component: _63070b42,
    name: "story-leadAge___en"
  }, {
    path: "/story/leadGender",
    component: _341e11ce,
    name: "story-leadGender___en"
  }, {
    path: "/story/mainCharacter",
    component: _7efe74ef,
    name: "story-mainCharacter___en"
  }, {
    path: "/story/origin",
    component: _794c3fb7,
    name: "story-origin___en"
  }, {
    path: "/story/plot",
    component: _6679b232,
    name: "story-plot___en"
  }, {
    path: "/story/settingPlace",
    component: _270b5de8,
    name: "story-settingPlace___en"
  }, {
    path: "/story/settingTime",
    component: _db1c6808,
    name: "story-settingTime___en"
  }, {
    path: "/",
    component: _6e74a3ab,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
