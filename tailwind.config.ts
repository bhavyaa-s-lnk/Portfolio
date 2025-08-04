import type { Config } from 'tailwindcss';


const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0e0e10',
        text: '#f8fafc',
        violetGlow: '#8b5cf6',
        cyanGlow: '#38bdf8',
      },
    },
  },
  plugins: [],
};

export default config;
