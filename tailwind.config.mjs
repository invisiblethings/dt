/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F5F3EE',
          100: '#E8E2D5',
          200: '#CFC5AE',
          300: '#B0A184',
          400: '#8A7A5C',
          500: '#665A42',
          600: '#4A4030',
          700: '#372F23',
          800: '#241F17',
          900: '#17130E',
          950: '#0C0A07',
        },
        copper: {
          50: '#FDF4EC',
          100: '#FAE4D0',
          200: '#F3C49B',
          300: '#EA9F64',
          400: '#DE7C3E',
          500: '#C15E28',
          600: '#9E461C',
          700: '#7A3618',
          800: '#5C2A15',
          900: '#452012',
        },
        cream: {
          DEFAULT: '#FAF4E9',
          soft: '#F3EADA',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 16px 40px -16px rgba(12, 10, 7, 0.35)',
        lift: '0 24px 60px -20px rgba(12, 10, 7, 0.45)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
