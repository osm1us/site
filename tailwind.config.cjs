/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#020617',
        'navy': '#0a192f',
        'light-navy': '#112240',
        'slate': '#8892b0',
        'light-slate': '#a8b2d1',
        'lightest-slate': '#ccd6f6',
        'neon-cyan': '#64ffda',
        'neon-pink': '#f57dff',
      },
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        mono: ['Orbitron', 'monospace'],
      },
    },
  },
  plugins: [],
}
