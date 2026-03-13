/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:     '#1F4E79',
        teal:     '#2C7DA0',
        orange:   '#F47C2C',
        red:      '#E94E1B',
        muted:    '#6B7A8D',
        border:   '#D0D8E4',
        offwhite: '#F4F6F9',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
