/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#15153A",
        secondary: "#C6A8E4",
        tertiary: "#D93382",
        accentColor: "#02121D"
      }
    },
  },
  plugins: [],
}