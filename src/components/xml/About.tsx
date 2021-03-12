import type { ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

/**
 * <about>
 */
export default function About({ children }: Props): ReactElement {
  return <div className="text-gray-500 text-xs">{children}</div>;
}
