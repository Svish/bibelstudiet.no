/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig }
 **/
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    screens: require('./tailwind.screens.js'),
    colors: require('./tailwind.colors.js'),
  },
};
