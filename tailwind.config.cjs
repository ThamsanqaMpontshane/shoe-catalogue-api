/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/*.handlebars",
    "./views/layouts/*.handlebars",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('flowbite/plugin'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/line-clamp'),
  ],
}
