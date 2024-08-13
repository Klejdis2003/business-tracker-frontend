import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|divider|link|navbar|pagination|popover|spinner|table|ripple|checkbox|spacer).js",
  ],
  purge: {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@nextui-org/theme/dist/components/(button|card|divider|link|navbar|table|ripple|spinner|checkbox|spacer).js",
    ],
    safelist: [
      // Regular expression to match all Next.js semantic color classes
      {
        pattern:
          /^(bg|text|border)-(primary|secondary|success|danger|warning|info|light|dark)(-\d+)?$/,
      },
    ],
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
