/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        primaryShadow: "0 1px 0 0 primary", // Maxsus soyani aniqlash
      },
      backgroundImage: {
        "home-bg": "url('/public/libaryBg.png')",
      },
      colors: {
        primary: "#05719B",
      },
    },
  },
  plugins: [nextui()],
};
