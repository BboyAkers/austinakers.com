// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  css: [
    '@/assets/main.css'
  ],
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
  content: {
    highlight: {
      theme: 'github-light'
    }
  },
  tailwindcss: {
    configPath: '~/.tailwind.config.js'
  }
})
