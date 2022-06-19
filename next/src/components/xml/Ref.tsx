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
  xref: string;
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

  // TODO: `aria-label` with full reference?

  const ref =
    'xref' in props
      ? props.xref
      : 'pref' in props
      ? props.pref + children
      : children;
  const query = encodeURIComponent(ref.replace(/\s+/g, ' ')).replace(
    /%20/g,
    '+'
  );

  const href =
    type !== 'egw'
      ? `https://bibel.no/nettbibelen?parse=${query}`
      : `http://text.egwwritings.org/search.php?lang=en&collection=2&section=all&QUERY=${query}`;

  return (
    <Link className="whitespace-nowrap" href={href}>
      {children}
    </Link>
  );
}
