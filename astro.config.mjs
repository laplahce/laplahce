import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Ensures your site builds as a fast, static website
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});