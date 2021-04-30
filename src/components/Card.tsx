import type { ReactElement, HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ className, ...props }: CardProps): ReactElement {
  return (
    <div
      className={clsx(
        'bg-white border border-gray-300 rounded-lg shadow-sm',
        className
      )}
      {...props}
    />
  );
}
