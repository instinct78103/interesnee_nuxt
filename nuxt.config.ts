// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-16',

  nitro: {
    devProxy: {
      '/wp-json': {
        target: process.env.API_URL + '/wp-json',
        changeOrigin: true,
        secure: false,
      },
    },
    prerender: {
      routes: ['/'],
    },
  },
  experimental: {
    appManifest: false,
    // payloadExtraction: false, // payload as external json file (not in *.html)
  },
  css: ['@/scss/layout/index.scss'],
  modules: ['@nuxt/image', '@pinia/nuxt'],
});