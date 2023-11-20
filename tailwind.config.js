const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      'primary': '#2d3748',
      'textDark': '#FFFFFF',
      'textLight': '#000000',
      'backgroundDark': '#1F2937',
      'inputDark': '#374151',
      'inputLight': '#F9FAFB',
      'backgroundLight': '#f7fafc',
      'accent': '#0284C7',
      'accentHover': '#0476af', 
      'secondaryBackgroundDark': '#111827',
      'secondaryBackgroundLight': '#F9FAFB',
    },
    // extend: {},
  },
  plugins: [],
});