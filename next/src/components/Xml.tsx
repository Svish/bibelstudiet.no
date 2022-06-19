import type { ReactElement } from 'react';

import { useMemo } from 'react';

import XmlToReact from 'util/XmlToReact';

import X from './xml/X';
import Exercise from './xml/Exercise';
import Link from './Link';
import Ref from './xml/Ref';
import Questions from './xml/Questions';

const parser = new XmlToReact({
  r: Ref,
  questions: Questions,
  a: Link,
  x: X,
  ex: Exercise,
});

interface Props {
  children: string;
}

export default function Xml({ children }: Props): ReactElement {
  return useMemo(() => {
    return parser.parse(children);
  }, [children]);
}
