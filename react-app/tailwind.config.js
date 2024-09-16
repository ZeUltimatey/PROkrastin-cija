/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        "playwrite-cuba": "Playwrite CU",
        playpen: "Playpen Sans",
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
      },
    },
  },
  plugins: [],
};
