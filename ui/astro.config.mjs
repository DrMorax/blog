// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import path from "path";

// https://astro.build/config
export default defineConfig({
  site: "https://morax.dev",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/feed/1/") && !page.endsWith("/404/"),
    }),
    icon(),
  ],
  server: {
    port: 3000,
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
