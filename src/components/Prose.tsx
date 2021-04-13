import type { ReactElement, ReactNode } from 'react';

import classNames from 'classnames';

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export default function Prose({
  children,
  className,
}: ProseProps): ReactElement {
  return <div className={classNames('prose md:prose-lg', className)}>{children}</div>;
}
