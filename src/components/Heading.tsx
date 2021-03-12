import type { ReactElement, ReactNode } from 'react';
import { H } from 'react-accessible-headings';
import classNames from 'classnames';

export { H, Level } from 'react-accessible-headings';

type Props = {
  variant: keyof typeof classes;
  className?: string;
} & ({ children: ReactNode } | { title: string; subtitle?: string });

const classes = {
  'h1': 'text-3xl md:text-4xl',
  'h2': 'text-2xl',
  'sr-only': 'sr-only',
} as const;

export default function Heading({
  variant,
  className,
  ...props
}: Props): ReactElement {
  return (
    <H className={classNames('mb-6', classes[variant], className)}>
      {'children' in props ? (
        props.children
      ) : (
        <>
          <div className="whitespace-nowrap">{props.title}</div>
          <div className="text-primary-600 text-xl lg:text-2xl">
            {props.subtitle}
          </div>
        </>
      )}
    </H>
  );
}
