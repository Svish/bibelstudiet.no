import type { ReactElement } from 'react';

import { useMemo } from 'react';

import XmlToReact from 'util/XmlToReact';

import Ref from './xml/Ref';
import List from './xml/List';

const parser = new XmlToReact({
  r: Ref,
  questions: List,
});

interface Props {
  children: string;
}

export default function Xml({ children }: Props): ReactElement {
  return useMemo(() => {
    return parser.parse(children);
  }, [children]);
}
