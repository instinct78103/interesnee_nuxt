// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  hooks: {
    async 'nitro:config'(nitroConfig) {
      const res = await fetch('https://api.resumatorapi.com/v1/jobs?apikey=4tWhJFtr8iWAl3VHxRc8HVIk0dSZEOBU')
      const data = await res.json()

      const dynamicRoutes = data.map(
          (item: { board_code: string }) => `/job/${item.board_code}`
      )

      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.routes = [
        ...(nitroConfig.prerender.routes || []),
        ...dynamicRoutes
      ]
    },
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
    devProxy: {
      '/wp-json': {
        target: process.env.API_URL + '/wp-json',
        changeOrigin: true,
        secure: false,
      },
    },
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