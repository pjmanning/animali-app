// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3cdfd9',
        secondary: '#0d112c',
        'animali-100': '#ffffff',
        'animali-200': '#f6f6f6',
        'animali-300': '#e0fcfa',
        'animali-400': '#5be8e1',
        'animali-500': '#6dbffe',
        'animali-600': '#1b4ea2',
        'animali-700': '#2d98ad',
        'animali-800': '#868894',
        'animali-900': '#10163a',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        national: ['NationalPark-Thin', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
