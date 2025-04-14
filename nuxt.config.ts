// https://nuxt.com/docs/api/configuration/nuxt-config
//export default defineNuxtConfig({
//  devtools: {enabled: true},
//  nitro: {
//    devProxy: {
//      '/wp-json': {
//        target: process.env.API_URL + '/wp-json',
//        changeOrigin: true,
//        secure: false,
//      },
//    },
//  },
//
////  Works on the client side only
//// vite: {
////    server: {
////      host: '0.0.0.0',
////      port: 3000,
////      proxy: {
////        '/wp-json': {
////          target: process.env.API_URL,
////          changeOrigin: true,
////          secure: false,
////        },
////      },
////    },
////  },
//
//  target: 'static',
////  generate: {
////    routes: ['/'],
////  },
//  routeRules: {
//    '/': { prerender: true }
//  },
//  compatibilityDate: '2024-11-16',
//});

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
  },
  css: ['@/scss/layout/index.scss'],
  modules: ['@nuxt/image', '@pinia/nuxt'],
});