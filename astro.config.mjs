// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: "https://morax.dev",
    server: {
        port: 3000,
    },
    integrations: [
        sitemap(),
    ]
});
