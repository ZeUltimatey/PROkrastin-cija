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
        "login-bg-image": 'url("/public/login_bg.jpg")',
        "categories-food": 'url("../public/products/cat_food.png")',
        "categories-furniture": 'url("../public/products/cat_furniture.png")',
        "categories-tools": 'url("../public/products/cat_tools.png")',
        "categories-toys": 'url("../public/products/cat_toys.png")',
        "categories-cats": 'url("/public/products/cats.png")',
      },
      colors: {
        "background-brown": "#967a67",
        "light-gray": "#eaded2",
        "hover-brown": "#D8C5B3",
        "dark-brown": "#3e2a19",
        "accent-brown": "#A67144",
        "content-white": "#EDEAE1",
        "medium-gray": "#d8d6ce",
        "light-brown": "#C59D82",
        "medium-brown": "#b38b6f",
      },
    },
  },
  plugins: [],
};
