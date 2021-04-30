import type { ReactElement } from 'react';

import { useMemo } from 'react';

import XmlToReact from 'util/XmlToReact';

import Ref from './xml/Ref';
import List from './xml/List';

// TODO: Deal with exercises (ex, x, nested ex)
//  - Use Context? If context not undefined => child ex?
//  - How to disable self textarea if children? Call up from child "I exist"?
// TODO: Deal with class="box"

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
