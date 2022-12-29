// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  content: {
    highlight: {
      theme: 'github-light'
    }
  },
  tailwindcss: {
    configPath: '~/.tailwind.config.js'
  }
})
