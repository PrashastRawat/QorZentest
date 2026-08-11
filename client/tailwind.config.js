/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#FFF0F4",
          100: "#FEDDE6",
          200: "#FBBBD1",
          300: "#F881B1",
          400: "#F53D99",
          500: "#F00FA5",
          600: "#D011C0",
          700: "#9B11B0",
          800: "#671093",
          900: "#460F76",
          950: "#290A47"
        },
        dark: {
          900: "#090D16",
          800: "#0E1525",
          700: "#141D33",
          600: "#1C2945",
          500: "#2B3C61"
        }
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.08)",
        glow: "0 0 40px -10px rgba(208, 17, 192, 0.3)",
        "glow-lg": "0 0 70px -15px rgba(208, 17, 192, 0.45)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    }
  },
  plugins: []
};