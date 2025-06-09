/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  extend: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },    colors: {
      azulFrancia: '#0077c8',
      dorado: '#FFA500',
      verde: '#00FF88',
      gris: '#333333',
      grisClarito: '#666666',
      neon: '#00FFFF',
      purple: '#8B5CF6',
      pink: '#EC4899',
      darkBg: '#0F0F23',
      cardBg: '#1A1A2E',
    },
    animation: {
      'float': 'float 6s ease-in-out infinite',
      'glow': 'glow 2s ease-in-out infinite alternate',
      'slide-up': 'slideUp 0.5s ease-out',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },      glow: {
        '0%': { boxShadow: '0 0 10px #00FFFF' },
        '100%': { boxShadow: '0 0 20px #00FFFF, 0 0 30px #00FFFF' },
      },
      slideUp: {
        '0%': { transform: 'translateY(100px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    },
  },
},
  plugins: [],
}
