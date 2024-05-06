/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '600px',
      'md': '960px',
      'lg': '1280px',
      'xl': '1920px',
      'xxl': '2560px',
    },
  },
  plugins: [],
  prefix: 'tw-',
}