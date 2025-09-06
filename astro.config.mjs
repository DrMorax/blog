// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'path';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: "https://morax.dev",
    server: {
        port: 3000,
    },
    vite: {
        resolve: {
            alias: {
                '@': path.resolve('./src'), 
            },
        },
    },
    integrations: [sitemap(), icon()],
    prefetch: {
        defaultStrategy: 'viewport',
    }
});