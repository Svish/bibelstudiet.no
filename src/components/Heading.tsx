import type { ReactElement, ReactNode } from 'react';
import { H } from 'react-accessible-headings';
import clsx from 'clsx';

export { H, Level } from 'react-accessible-headings';

type Props = {
  variant: keyof typeof classes;
  className?: string;
  top?: string;
  title: string | number;
  subtitle?: string;
  right?: ReactNode;
};

const classes = {
  'h1': 'text-3xl md:text-4xl',
  'h2': 'text-2xl',
  'sr-only': 'sr-only',
} as const;

// TODO: Design `right` better... and deal with screen sizes...
// Make <DateSquare> component?

export default function Heading({
  variant,
  className,
  ...props
}: Props): ReactElement {
  return (
    <H
      className={clsx(
        'mb-6 text-opacity-30 flex justify-between',
        classes[variant],
        className
      )}
    >
      <div>
        {props.top != null && (
          <div className="text-xl text-gray-500">{props.top}</div>
        )}
        <div className="whitespace-pre-line">{props.title}</div>
        {props.subtitle != null && (
          <div className="text-xl text-primary-600 lg:text-2xl">
            {props.subtitle}
          </div>
        )}
      </div>
      {props.right != null && (
        <div className="text-xl text-gray-500">{props.right}</div>
      )}
    </H>
  );
}
