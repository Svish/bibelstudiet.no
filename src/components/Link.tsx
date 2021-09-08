import type { ReactElement } from 'react';

import { getUrl, UrlSubject } from 'api/util';

import NextLink from 'next/link';

interface LinkProps extends Omit<React.HTMLProps<HTMLAnchorElement>, 'href'> {
  href: string | UrlSubject;
}

export default function Link({
  href,
  children,
  ...props
}: LinkProps): ReactElement {
  if (typeof href !== 'string') {
    href = getUrl(href);
  }

  if (/^(?:https?|mailto)?:/.test(href)) {
    props.rel = 'external nofollow noreferrer noopener';
    props.target = '_blank';
  }

  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
}
