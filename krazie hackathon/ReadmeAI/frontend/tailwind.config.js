/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0F1419',
        'slate': {
          '900': '#121820',
          '800': '#1a1f2e',
          '700': '#252d3d',
          '600': '#3d4556',
          '500': '#546e7a',
          '400': '#90a4ae',
          '300': '#b0bec5',
          '200': '#cfd8dc',
          '100': '#eceff1',
          '50': '#f8fafb',
        },
        'primary': '#1D88E5',
        'primary-light': '#42A5F5',
        'secondary': '#0066FF',
        'accent': '#FFB84D',
        'success': '#1ED761',
        'warning': '#FFA726',
        'danger': '#EF5350',
        'card': '#1a1f2e',
        'glass': 'rgba(26, 31, 46, 0.85)',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1D88E5 0%, #0066FF 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FFB84D 0%, #FFA726 100%)',
        'gradient-success': 'linear-gradient(135deg, #1ED761 0%, #00D084 100%)',
        'glassmorphism': 'linear-gradient(120deg, rgba(26, 31, 46, 0.85) 60%, rgba(29, 136, 229, 0.05) 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 32px 0 #1D88E544',
        'glow-accent': '0 0 32px 0 #FFB84D44',
        'glow-success': '0 0 24px 0 #1ED76144',
        'elevation-1': '0 2px 4px rgba(0, 0, 0, 0.32)',
        'elevation-2': '0 4px 8px rgba(0, 0, 0, 0.44)',
        'elevation-3': '0 8px 16px rgba(0, 0, 0, 0.52)',
      },
      blur: {
        xs: '2px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both',
        'slide-up': 'slide-up 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
