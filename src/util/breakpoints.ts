import { createBreakpoint } from 'react-use';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';

import screens from '../../tailwind.screens';

export type Breakpoint = keyof typeof breakpoints;
export const breakpoints = {
  sm: 0,
  md: Number.parseInt(screens.md),
  lg: Number.parseInt(screens.lg),
  xl: Number.parseInt(screens.xl),
};

export const useBreakpoint = createBreakpoint(breakpoints) as () => Breakpoint;

/**
 * Creates string for the `sizes` attribute for responsive images.
 *
 * @param md View-widths for medium breakpoint
 * @param lg View-widths for large breakpoint
 * @param xl View-widths for x-large breakpoint
 * @returns Value for the `sizes` attribute of an image, based on configured breakpoints.
 * @see https://nextjs.org/docs/api-reference/next/image#sizes
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes
 */
export function getSizes(
  sm: number,
  md: number,
  lg: number,
  xl: number
): string {
  return (
    `(min-width: ${screens.xl}) ${xl}vw, ` +
    `(min-width: ${screens.lg}) ${lg}vw, ` +
    `(min-width: ${screens.md}) ${md}vw, ` +
    `${sm}vw`
  );
}

export function useBreakpointDebug(): string {
  const br = useBreakpoint();
  const { width } = useWindowSize();

  const [sizeDebug, setSizeDebug] = useState('');
  useEffect(() => {
    setSizeDebug(`${width} >= ${breakpoints[br]} (${br})`);
  }, [br, width]);

  return sizeDebug;
}
