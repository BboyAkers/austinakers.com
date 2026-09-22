// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/a11y',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/work': { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
