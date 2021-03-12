import type { ReactElement } from 'react';

import { useMemo } from 'react';
import map from 'components/xml/components';

import XmlToReact from 'util/XmlToReact';
import Prose from './Prose';

const parser = new XmlToReact(map);

interface Props {
  className?: string;
  children: string;
}

export default function Xml({ children, className }: Props): ReactElement {
  const parsed = useMemo(() => parser.parse(children), [children]);

  return <Prose className={className}>{parsed}</Prose>;
}
