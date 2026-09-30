/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Smile Liners brand palette (sampled from the logo)
        // navy: "smile" wordmark
        navy: {
          50: "#EAF0FA",
          100: "#CCD9EF",
          200: "#99B3DF",
          300: "#5F86C6",
          400: "#2F5EA8",
          500: "#12478F",
          600: "#0A3F8C",
          700: "#063679",
          800: "#002F73",
          900: "#001B52",
          950: "#00123A",
        },
        // brand: "liners" wordmark teal/cyan
        brand: {
          50: "#E6FAFC",
          100: "#C5F2F7",
          200: "#8DE4EE",
          300: "#4DD3E3",
          400: "#01BFCF",
          500: "#03A6BF",
          600: "#0487A5",
          700: "#056F88",
          800: "#0A5A6E",
          900: "#0C4A5B",
        },
        // accent: tooth outline blue
        accent: {
          50: "#E6F1FC",
          400: "#00CBFD",
          500: "#02A1E5",
          600: "#046AD9",
        },
      },
    },
  },
  plugins: [],
}
