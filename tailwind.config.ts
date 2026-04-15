import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Netflix Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        netflix: {
          red:    '#e50914',
          dark:   '#141414',
          black:  '#000000',
          gray:   '#808080',
          light:  '#e5e5e5',
        },
      },
      backgroundImage: {
        'gradient-netflix': 'linear-gradient(to right, rgba(20,20,20,1) 0%, rgba(20,20,20,0.7) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
