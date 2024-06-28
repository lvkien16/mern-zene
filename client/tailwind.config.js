/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EE4C7C",
        secondary: "#E3E2DF",
      },
      height: {
        "screen-65.5px": "calc(100vh - 65.5px)",
      },
    },
  },
  plugins: [],
};
