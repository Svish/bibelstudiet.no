import type { ReactElement, HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ className, ...props }: CardProps): ReactElement {
  return (
    <div
      className={classNames(
        'bg-white border border-gray-300 rounded-lg shadow-sm',
        className
      )}
      {...props}
    />
  );
}
