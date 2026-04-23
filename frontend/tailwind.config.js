/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0F5FA",
          100: "#D9E5F2",
          200: "#B3CBE5",
          300: "#7FA5CC",
          400: "#4C7DB0",
          500: "#1E4C7A",
          600: "#184068",
          700: "#143352",
          800: "#0F2540",
          900: "#0A1A2E",
        },
        accent: {
          50: "#FFF2EB",
          100: "#FFDEC9",
          200: "#FFB88C",
          300: "#FF904F",
          400: "#FF7A2A",
          500: "#FF6B35",
          600: "#E04A14",
          700: "#B3380E",
        },
        ink: "#0F1A2B",
        paper: "#F7F8FA",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -8px rgba(15, 26, 43, 0.15)",
        card: "0 2px 8px -2px rgba(15, 26, 43, 0.08)",
        lift: "0 20px 50px -15px rgba(15, 26, 43, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
