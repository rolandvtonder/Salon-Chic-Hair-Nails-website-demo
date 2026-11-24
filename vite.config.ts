import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// One HTML file per page, so every page has its own real URL (/hair/, /nails/ …)
// and works on any static host without a router or a rewrite rule.
const pages = ["hair", "nails", "lashes", "wellness", "specials", "about", "contact"];

export default defineConfig({
  // "/" locally; the GitHub Pages workflow sets BASE_PATH to "/<repo-name>/".
  // Every path in src/ goes through u() in src/lib/url.ts to pick this up.
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        ...Object.fromEntries(pages.map((p) => [p, resolve(__dirname, `${p}/index.html`)])),
      },
    },
  },
});
