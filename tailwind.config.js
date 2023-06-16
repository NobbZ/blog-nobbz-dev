/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundPosition: {
        box: "left 9px top 9px",
      },
      backgroundImage: {
        quote:
          'url(\'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="2.25em" height="2.25em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"%3E%3Cpath fill="rgb(52, 152, 219)" d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"%2F%3E%3C%2Fsvg%3E\')',
      },
    },
  },
  plugins: [],
};
