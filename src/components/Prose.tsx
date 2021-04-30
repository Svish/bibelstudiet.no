import type { ReactElement, ReactNode } from 'react';

import clsx from 'clsx';

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export default function Prose({
  children,
  className,
}: ProseProps): ReactElement {
  return <div className={clsx('prose md:prose-lg', className)}>{children}</div>;
}
