import type { ReactElement } from 'react';

import clsx from 'clsx';
import useClickableSubject, { UrlSubject } from 'util/useClickableSubject';

import Card, { CardProps } from 'components/Card';

interface CardLinkProps extends CardProps {
  to: UrlSubject;
}

export default function CardLink({
  className,
  to,
  ...props
}: CardLinkProps): ReactElement {
  const clickableProps = useClickableSubject('link', to);
  return (
    <Card
      className={clsx(
        'focus-secondary active:bg-secondary-100 hover:bg-secondary-50 bg-white hover:border-secondary-400 focus:border-secondary-400 cursor-pointer',
        className
      )}
      {...clickableProps}
      {...props}
    />
  );
}
