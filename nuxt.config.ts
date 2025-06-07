// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  ssr: true,
  experimental: {
    appManifest: false,
    payloadExtraction: false, // if true, payload as external json file (not in *.html)
    renderJsonPayloads: false,
    defaults: {
      nuxtLink: {
        activeClass: 'active',
      }
    }
  },
  compatibilityDate: '2024-11-16',
  router: {
    prefetchLinks: false
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [],
    },
  },
  css: ['@/scss/layout/index.scss'],
  delayHydration: {
    debug: process.env.NODE_ENV === 'development',
    mode: 'mount'
  },
  modules: ['@nuxt/image', '@pinia/nuxt', 'nuxt-delay-hydration'],
});