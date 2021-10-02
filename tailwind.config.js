const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  // theme: {
  //   extend: {},
  // },
  variants: {
    extend: {},
  },
  plugins: [],

  theme: {
    colors: {
      black: colors.black,
      red: colors.red,
      yellow: {
        standard: '#F3E8C9',
      },
      green: {
        standard: '#2A572C',
      },
      white: {
        standard: '#FFFFFF',
        offWhite: '#fafbfc',
        creamWhite: '#f9f9f9',
        dirtyWhite: '#F6F6F6',
      },
      grey: {
        standard: '#605F5F',
        light: '#858484',
        lighter: '#818181',
        lightest: '#DCDCDC',
        dark: '#1F1F1F',
      },
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
      'xl': '25px',
      'xxl': '50px',
    }
  },
}
