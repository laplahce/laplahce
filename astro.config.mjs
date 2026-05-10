import { defineConfig } from 'astro/config';

export default defineConfig({
  // Ensures your site builds as a fast, static website
  output: 'static',
  content: {
    dir: './src/content',
  },
});