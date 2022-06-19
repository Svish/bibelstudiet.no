import type { ReactElement, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function X({ children }: Props): ReactElement {
  // TODO: Change to a more stand-out color?
  return <span className="text-primary-900">{children}</span>;
}
