module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}","./src/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        blue_gray: { 800: "var(--blue_gray_800)", "900_0c": "var(--blue_gray_900_0c)"},
        deep_orange: { 700: "var(--deep_orange_700)"},
        gray: { 500: "var(--gray_500)", 900: "var(--gray_900)", "900_01": "var(--gray_900_01)" },
        light_green: { 800: "var(--light_green_800)", a700: "var(--light_green_a700)" },
        white: { a700: "var(--white_a700)" }
      },
      boxShadow: { xs: "0 3px 8px -1px #3232470c"},
      fontFamily: { poppins: "Poppins", inter: "Inter", urbanist: "Urbanist"}
    }
  },
  plugins: [require("@tailwindcss/forms")]
};