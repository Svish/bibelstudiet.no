import type { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  children?: ReactNode;
  className?: string;
  type?: 'parent' | 'child';
}

export default function Exercise({
  children,
  type,
  className,
}: Props): ReactElement {
  return (
    <div className={clsx('font-semibold', className)}>
      {children}
      {type !== 'parent' && (
        <form>
          <textarea></textarea>
        </form>
      )}
    </div>
  );
}
