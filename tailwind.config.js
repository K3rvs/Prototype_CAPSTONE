/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./App.tsx"],
  safelist: [
    {
      pattern: /(bg|text|border)-(sky|blue|indigo|purple|teal|emerald|amber|orange|red|rose|slate|cyan)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ['hover', 'active', 'focus', 'group-hover'],
    },
    {
      pattern: /border-(l|t|r|b)-(sky|blue|indigo|purple|teal|emerald|amber|orange|red|rose|slate|cyan)-(100|200|300|400|500|600|700)/,
      variants: ['hover', 'active', 'focus', 'group-hover'],
    }
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}