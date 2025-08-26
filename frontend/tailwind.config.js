// tailwind.config.js
 export default {
  theme: {
    extend: {
      keyframes: {
        bgMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeIn: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        bgMove: "bgMove 15s ease infinite",
        fadeIn: "fadeIn 1.5s ease-in forwards",
      },
    },
  },
  plugins: [],
};
