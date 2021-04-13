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
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              'color': theme('colors.secondary.700'),
              'textDecoration': 'underline',
              'textDecorationColor': theme('colors.secondary.300'),
              'textDecorationThickness': '0.1em',
              'textUnderlineOffset': '0.155em',
              '&:hover': {
                color: theme('colors.secondary.500'),
                textDecorationColor: theme('colors.secondary.200'),
              },
            },
          },
        },
        lg: {},
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
