/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PeakForm design tokens — extraídos del peakform-ui.jsx
        bg:       '#0a0a0a',
        surface:  '#141414',
        surface2: '#1c1c1c',
        surface3: '#242424',
        border:   '#242424',
        border2:  '#303030',
        border3:  '#3c3c3c',
        text1:    '#f0efe8',
        text2:    '#7a7a7a',
        text3:    '#404040',
        accent:   '#ff6b2b',
        'accent-hov': '#ff8347',
        'accent-sub': 'rgba(255,107,43,0.10)',
        green:    '#00d67f',
        'green-sub':  'rgba(0,214,127,0.08)',
        yellow:   '#f5a623',
        purple:   '#9b6dff',
        danger:   '#ff4444',
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", 'sans-serif'],
        dm:    ["'DM Sans'",    'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px', // Sin border-radius en PeakForm
      },
    },
  },
  plugins: [],
}
