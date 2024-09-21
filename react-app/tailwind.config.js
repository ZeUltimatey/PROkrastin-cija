/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        baloo: ['"Baloo Bhaijaan 2"', "cursive"],
        hind: ["Hind", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slide: {
          "slide-left": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-100%)" },
          },
        },
      },
      backgroundImage: {
        "cat-bg-image": 'url("/public/cat_bg.png")',
        "categories-food": 'url("../public/products/cat_food.png")',
        "categories-furniture": 'url("../public/products/cat_furniture.png")',
        "categories-tools": 'url("../public/products/cat_tools.png")',
        "categories-toys": 'url("../public/products/cat_toys.png")',
        "categories-cats": 'url("../public/products/cats.png")',
      },
    },
  },
  plugins: [],
};
