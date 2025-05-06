import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      fontFamily: { 'dm-sans': ['var(--font-dm-sans)', ...defaultTheme.fontFamily.sans] },
    },
  },
  plugins: [],
};

export default config;
