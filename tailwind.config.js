module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],

  theme: {
    colors: {
      yellow: {
        standard: '#F3E8C9',
      },
      green: {
        standard: '#2A572C',
      },
      white: {
        standard: '#FFFFFF',
      }
    }
  },
}
