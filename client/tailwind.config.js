/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE4C7C",
        secondary: "#E3E2DF",
      },
      margin: {
        Header: "65.5px",
      },
    },
  },
  plugins: [],
};
