export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ghibli-bg': '#FFF5F8',
        'ghibli-primary': '#FF8E9E', // cute pink
        'ghibli-secondary': '#FFB6C1', // light pink
        'ghibli-text': '#5C4B51', // warm brown
        'ghibli-text-light': '#8C7B81', // lighter brown
        'ghibli-card': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'soft-hover': '0 10px 25px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
