/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        mitr: ["Mitr", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        sg: ["Space Grotesk", "sans-serif"],
      },
      borderWidth: {
        1: "1px",
        0.5: "0.5px",
      },
      rotate: {
        40: "40deg",
      },
    },
    screens: {
      sm: "500px",
      // => @media (min-width: 640px) { ... }

      md: "840px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
