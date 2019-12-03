const { locales } = require('./i18n/_config');

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'the-movie-project',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      { hid: 'description', name: 'description', content: 'The Movie Project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Global CSS
   */
  css: [{ src: '~assets/styles/styles.scss', lang: 'sass' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/bootstrap-components.js'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Modules
   */
  modules: [
    'bootstrap-vue/nuxt',
    [
      'nuxt-i18n',
      {
        locales,
        lazy: true,
        langDir: 'i18n/',
        defaultLocale: 'en'
      }
    ]
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  /*
   ** Router configuration
   */
  // router: { }
};
