/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/*.handlebars",
    "./views/layouts/*.handlebars",
  ],
  theme: {
    extend: {},
      screens: {
        'sm': {'min': '320px', 'max': '640px'},
        'md': {'min': '640px', 'max': '1535px'},
        'lg': {'min': '1024px', 'max': '1279px'},
        'xl': {'min': '1280px', 'max': '1535px'},
        '2xl': {'min': '1536px'},
      },
  },
  plugins: [require("daisyui")
],
}
