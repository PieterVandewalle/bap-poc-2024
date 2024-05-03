import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin()
  ],
}