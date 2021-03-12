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

export function getSizes(md: number, lg: number, xl: number): string {
  return (
    `(min-width: ${screens.xl}) ${xl}vw,` +
    `(min-width: ${screens.lg}) ${lg}vw,` +
    `(min-width: ${screens.md}) ${md}vw,` +
    `100vw`
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
