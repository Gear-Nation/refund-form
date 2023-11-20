import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jet: "#3C3744",
        dukeBlue: "#090C9B",
        trueBlue: "#3066BE",
        powderBlue: "#B4C5E4",
        ivory: "#FBFFF1",
      },
    },
  },
  plugins: [],
};
export default config;
