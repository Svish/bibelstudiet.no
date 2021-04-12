/**
 * Tailwind Color Palette Configuration
 *
 * @see https://tailwindcss.com/docs/customizing-colors#color-palette-reference
 * @see https://identity.adventist.org/global-elements/color
 * @see https://www.tailwindshades.com
 * @see https://tailwind.ink
 * @see https://contrast-ratio.com
 * @see https://www.tailwindshades.com (#4B207F, 14, 7, Emperor)
 * @see https://www.tailwindshades.com (#365da1, 12, 10, Denim)
 **/
module.exports = {
  transparent: 'transparent',
  current: 'currentColor',
  white: withOpacity('--color-white'),
  black: withOpacity('--color-black'),
  gray: {
    50: withOpacity('--color-gray-50'),
    100: withOpacity('--color-gray-100'),
    200: withOpacity('--color-gray-200'),
    300: withOpacity('--color-gray-300'),
    400: withOpacity('--color-gray-400'),
    500: withOpacity('--color-gray-500'),
    600: withOpacity('--color-gray-600'),
    700: withOpacity('--color-gray-700'),
    800: withOpacity('--color-gray-800'),
    900: withOpacity('--color-gray-900'),
  },
  primary: {
    50: withOpacity('--color-primary-50'),
    100: withOpacity('--color-primary-100'),
    200: withOpacity('--color-primary-200'),
    300: withOpacity('--color-primary-300'),
    400: withOpacity('--color-primary-400'),
    500: withOpacity('--color-primary-500'),
    600: withOpacity('--color-primary-600'),
    700: withOpacity('--color-primary-700'),
    800: withOpacity('--color-primary-800'),
    900: withOpacity('--color-primary-900'),
  },
  secondary: {
    50: withOpacity('--color-secondary-50'),
    100: withOpacity('--color-secondary-100'),
    200: withOpacity('--color-secondary-200'),
    300: withOpacity('--color-secondary-300'),
    400: withOpacity('--color-secondary-400'),
    500: withOpacity('--color-secondary-500'),
    600: withOpacity('--color-secondary-600'),
    700: withOpacity('--color-secondary-700'),
    800: withOpacity('--color-secondary-800'),
    900: withOpacity('--color-secondary-900'),
  },
};

function withOpacity(variableName) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${variableName}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${variableName}))`;
  };
}
