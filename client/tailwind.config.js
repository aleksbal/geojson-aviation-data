// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans your files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        accent: '#38c172',
      },
      height: {
        '80vh': '80vh',
      },
      spacing: {
        '1/2': '50%',
      },
    },
  },
  plugins: [],
};
