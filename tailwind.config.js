/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  coreUtilities: true, // Enable core utilities for Tailwind 4
  presets: [require("@tailwindcss/typography")],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
