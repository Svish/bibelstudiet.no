import type { ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function Skip({ children }: Props): ReactElement {
  return <>{children}</>;
}
