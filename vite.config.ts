import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    fs: {
      allow: [
        // Default allow list
        ".",
        // Allow access to Yarn PnP cache
        ".yarn",
        ".yarn/__virtual__",
      ],
    },
    watch: {
      usePolling: true,
    },
  },
});
