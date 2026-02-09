/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        supabase: {
          bg: '#1c1c1c',
          surface: '#232323',
          border: '#303030',
          primary: '#3ecf8e',  // Supabase Green
          secondary: '#6ee7b7',
          hover: '#2a2a2a',
          text: '#ededed',
          muted: '#8B8B8B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #3ecf8e, 0 0 10px #3ecf8e' },
          '100%': { boxShadow: '0 0 10px #3ecf8e, 0 0 20px #3ecf8e' },
        }
      }
    },
  },
  plugins: [],
}
