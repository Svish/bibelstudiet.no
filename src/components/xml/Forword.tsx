import type { ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

/**
 * <forword>
 */
export default function Forword({ children }: Props): ReactElement {
  return <>{children}</>;
}
