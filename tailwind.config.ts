import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0eeff',
          100: '#e1dcff',
          200: '#c5baff',
          300: '#9d8bfd',
          400: '#7953fa',
          500: '#6C4CFD', // Primary LOOP Purple
          600: '#5932f3',
          700: '#4a23da',
          800: '#3d1db5',
          900: '#341991',
        },
        loop: {
          purple: '#6C4CFD',
          purpleLight: '#8B5CF6',
          cyan: '#06B6D4',
          blue: '#3B82F6',
          darkBg: '#0b0f19',
          darkCard: '#151c2c',
          darkBorder: '#232d42',
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-light': '0 4px 20px -2px rgba(108, 76, 253, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 30px -4px rgba(108, 76, 253, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow-purple': '0 0 25px -5px rgba(108, 76, 253, 0.4)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
