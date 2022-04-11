module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#20156e",
          main: "#6755c9",
          light: "#9696ff",
          alternate: "#70A9A1",
          ultralight: "#e0e0fd",
          red: "#b00a0a",
          highlight: "#ff931a",
          highlight_light: "#ffd195",
        },
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      extend: {},
    },
  },
  plugins: [],
};
