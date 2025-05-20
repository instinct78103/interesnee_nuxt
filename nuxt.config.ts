// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-16',
  router: {
    prefetchLinks: false
  },
  nitro: {
    devProxy: {
      '/wp-json': {
        target: process.env.API_URL + '/wp-json',
        changeOrigin: true,
        secure: false,
      },
    },
    // prerender: {
    //   routes: ['/'],
    // },
  },
  experimental: {
    appManifest: false,
    payloadExtraction: false, // if true, payload as external json file (not in *.html)
  },
  css: ['@/scss/layout/index.scss'],
  delayHydration: {
    debug: process.env.NODE_ENV === 'development',
    mode: 'mount'
  },
  modules: ['@nuxt/image', '@pinia/nuxt', 'nuxt-delay-hydration'],
});