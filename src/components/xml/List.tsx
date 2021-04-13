import type { ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function List({ children }: Props): ReactElement {
  return <ul>{children}</ul>;
}
