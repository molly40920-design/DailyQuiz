export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ghibli-bg': '#F4F1EA',
        'ghibli-primary': '#8FA08B', // muted sage
        'ghibli-secondary': '#C48A7E', // warm terracotta
        'ghibli-text': '#4A463F',
        'ghibli-text-light': '#7A756D',
        'ghibli-card': '#FAFAF8',
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
