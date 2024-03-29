
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      colors: {
        blue: {
          light: '#0274b3',
          dark: '#00679e'
        },
        grey: {
          light: '#50514f',
          dark: '#393a38'
        },
        green: {
          light: '#54b4a4',
          dark: '#4ca193'
        }
      },
      minHeight: {
        '9/10': '90vh',
      }
    }
  }
}
