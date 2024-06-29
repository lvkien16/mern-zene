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
        "screen-header": "calc(100vh - (65.5px + 17px))",
        "screen-64px-header": "calc(100vh - (60px + 64px + 65.5px + 17px))",
      },
      maxWidth: {
        "2/3": "calc(100% / 3 * 2)",
      },
    },
  },
  plugins: [],
};
