/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'display': ['Chelsea Market, serif']
    },
    extend: {},
  },
  daisyui: {
    themes: ["cupcake"]
  },
  plugins: [require("daisyui")],
}

