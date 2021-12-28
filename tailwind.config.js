/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  purge: [

    './components/**/*.{vue,js}',

    './layouts/**/*.vue',

    './pages/**/*.vue',

    './plugins/**/*.{js,ts}',

    './nuxt.config.{js,ts}',

  ],
  theme: {
    colors: {
      blue: {
        lighter: '#247BA0',
        default: '#247BA0',
        dark: '#247BA0'
      },
      white: {
        lighter: '#f8f8f8',
        default: '#f8f8f8',
        dark: '#e0e0e0'
      },
      red: {
        lighter: '#F25F5C',
        default: '#F25F5C',
        dark: '#F25F5C'
      },
      grey: {
        lighter: '#50514F',
        default: '#50514F',
        dark: '#50514F'
      },
      yellow: {
        lighter: '#FFE066',
        default: '#FFE066',
        dark: '#FFE066'
      },
      green: {
        lighter: '#70C1B3',
        default: '#70C1B3',
        dark: '#70C1B3'
      }
    }
  },
  variants: {},
  plugins: []
}
