/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dde6ff',
          200: '#c3d1ff',
          300: '#9db2ff',
          400: '#7089ff',
          500: '#4a61fa',
          600: '#3340ef',
          700: '#2a30d4',
          800: '#252bab',
          900: '#252a87',
          950: '#161851',
        },
        surface: {
          0: '#ffffff',
          50: '#f8f9fc',
          100: '#f0f2f8',
          200: '#e4e7f0',
          800: '#1e2235',
          900: '#141728',
          950: '#0d0f1c',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease both',
        'slide-up': 'slideUp 0.4s ease both',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
