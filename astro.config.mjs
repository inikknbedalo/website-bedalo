// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://bedalo.pages.dev',
  integrations: [],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  build: {
    inlineStylesheets: 'auto',
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // Security: Restrict remote image domains
    domains: [
      'bedalo.pages.dev',
      'lh3.googleusercontent.com', // Google Maps
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks for better caching
            if (id.includes('node_modules')) {
              // Chart.js and related
              if (id.includes('chart.js') || id.includes('chartjs')) {
                return 'charts';
              }
              
              // Date utilities
              if (id.includes('date-fns')) {
                return 'date-utils';
              }
              
              // CountUp
              if (id.includes('countup')) {
                return 'countup';
              }
              
              // Lightbox
              if (id.includes('glightbox')) {
                return 'lightbox';
              }
              
              // Other vendors
              return 'vendor';
            }
          },
        },
      },
    },
  },
});