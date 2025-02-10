/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        grad_1:
          "linear-gradient(to right , #F8BF3B 0%, #FF8B13 31%,#EF5F3D 100%)",
        grad_2: "linear-gradient(to right , #2C3D68, #0764A7)",
      },
      boxShadow: {
        cs: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
      },
      colors: {
        primary: "#FF8B13",
        secondary: "#2C3D68",
        grey_1: "#787878",
        grey_2: "#DEDEDE",
      },
      fontFamily: {
        Nunito: "'Nunito', serif",
        NunitoSans: "'Nunito sans', serif",
      },
    },
  },
  plugins: [],
};
