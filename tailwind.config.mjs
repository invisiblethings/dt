/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f7',
          100: '#d4dfeb',
          200: '#a9bfd7',
          300: '#7e9fc3',
          400: '#537faf',
          500: '#365f8f',
          600: '#294a70',
          700: '#1d3552',
          800: '#142640',
          900: '#0b1626',
          950: '#060d16',
        },
        ember: {
          50: '#fff4ed',
          100: '#ffe4d2',
          200: '#ffc4a3',
          300: '#ff9d6b',
          400: '#ff7433',
          500: '#f6560f',
          600: '#e13f09',
          700: '#ba2c0a',
          800: '#94240f',
          900: '#78210f',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(11, 22, 38, 0.25)',
      },
    },
  },
  plugins: [],
};
