// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/a11y',
    '@vercel/analytics',
  ],
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['js', 'jsx', 'json', 'ts', 'tsx', 'vue', 'css', 'html', 'bash', 'md', 'mdc', 'yaml', 'javascript', 'typescript', 'sh', 'shell', 'markdown', 'yml', 'diff']
        }
      }
    }
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  ui: {
    // No webfonts: all stacks are system (ui-monospace/SF/Menlo).
    // Saves ~135KB of woff2 + 51 @font-face blocks vs @nuxt/fonts defaults.
    fonts: false,
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en', class: 'dark' },
    },
  },
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
