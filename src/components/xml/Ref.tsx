import type { ReactNode, ReactElement } from 'react';

import Link from 'components/Link';

interface CommonProps {
  children?: ReactNode;
  type?: 'egw';
}

/**
 * <r>foo</r> => foo
 */
interface ImplicitRef {}

/**
 * <r ref="bar">foo</r> => bar
 */
interface ExplicitRef {
  ref: string;
}

/**
 * <r pref="bar">foo</r> => foobar
 */
interface PartialRef {
  pref: string;
}

type Props = CommonProps & (ImplicitRef | ExplicitRef | PartialRef);

/**
 * <r>
 */
export default function Ref({ children, type, ...props }: Props): ReactElement {
  if (typeof children !== 'string') {
    console.warn('<r> children must be string, but was ', children);
    throw new Error('<r> children must be string');
  }

  const ref =
    'ref' in props
      ? props.ref
      : 'pref' in props
      ? props.pref + children
      : children;
  const query = encodeURIComponent(ref.replace(/\s+/g, ' '));

  const href =
    type !== 'egw'
      ? `https://bibel.no/nettbibelen?parse=${query}`
      : `http://text.egwwritings.org/search.php?lang=en&amp;collection=2&amp;section=all&amp;QUERY=${query}`;

  return <Link href={href}>{children}</Link>;
}
