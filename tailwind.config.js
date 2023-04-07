/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  
  theme: {
    extend: {
      keyframes: {
        scaleUp: {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        },
        scaleDown: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.5)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },

        wiggle: {
          "0%": { transform: "translatex(0)" },
          "25%": { transform: "translatex(-10px)" },
          "50%": { transform: "translatex(10px)" },
          "75%": { transform: "translatex(-10px)" },
          "100%": { transform: "translatex(0)" },
        },

        slideInFromLeft: {
          "0%": { transform: "translatex(-100%)" },
          "100%": { transform: "translatex(0)" },
        },
      },
      animation: {
        scaleUp: "scaleUp 0.5s ease-in-out",
        scaleDown: "scaleDown 0.5s ease-in-out forwards",
        fadeIn: "fadeIn 1s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out forwards",
        wiggle: "wiggle 1s ease-in-out",
        slideInFromLeft: "slideInFromLeft 1s ease-in-out ",
      },
    },
  },

  plugins: [],
}

