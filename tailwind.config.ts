// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#ffffff',
        surface: '#fafafa',
        border: '#f0f0f0',
        text: '#111111',
        muted: '#6b6b6b',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['SF Mono', 'monospace'],
      },
      backgroundImage: {
        prism: 'linear-gradient(90deg,#ff7ad9,#7b61ff)',
      },
    },
  },
  plugins: [],
} satisfies Config