import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#EDEAE0',
          deep: '#E2DECE',
          card: '#FBFAF5',
        },
        ink: {
          DEFAULT: '#21262C',
          soft: '#565C5F',
        },
        rule: '#C9C2AC',
        line: '#D8D2BE',
        stamp: {
          DEFAULT: '#A93A2C',
          dark: '#7E2A20',
          green: '#2E6B57',
        },
      },
      fontFamily: {
        display: ['var(--font-slab)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        shell: '1080px',
        prose: '68ch',
      },
      boxShadow: {
        sheet:
          '0 1px 0 #fff, 0 18px 34px -18px rgba(33,38,44,0.35), 0 4px 10px -4px rgba(33,38,44,0.18)',
      },
      borderRadius: {
        press: '3px',
      },
      screens: {
        shelf: '860px',
      },
    },
  },
  plugins: [],
};

export default config;
