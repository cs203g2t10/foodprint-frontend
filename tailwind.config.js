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
  enabled: process.env.NODE_ENV === "production",

  theme: {
    colors: {
      gray: colors.gray,
      black: colors.black,
      blue: colors.blue,
      yellow: {
        standard: '#F3E8C9',
        dark: '#DDB546',
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
      red: {
        standard: '#db544b'
      }
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
      'xl': '25px',
      'xxl': '50px',
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    lineHeight: {
      'extra-loose': '2.5',
      '12': '5rem',
    },
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '0': '0',
      '45': '45deg',
      '90': '90deg',
      '135': '135deg',
      '180': '180deg',
      '270': '270deg',
      '-65': '-65deg',
    }
  },
}
