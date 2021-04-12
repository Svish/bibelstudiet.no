import type { ReactElement } from 'react';

import { useMemo } from 'react';

import XmlToReact, { Components } from 'util/XmlToReact';

import Skip from './xml/Skip';
import Ref from './xml/Ref';

interface Map {
  forword: Components;
  memory: Components;
}

const components: Map = {
  forword: { forword: Skip, r: Ref },
  memory: { memory: Skip, r: Ref },
} as const;

interface Props {
  children: string;
  map: keyof Map;
}

export default function Xml({ children, map }: Props): ReactElement {
  const parsed = useMemo(() => {
    const parser = new XmlToReact(components[map]);
    return parser.parse(children);
  }, [children, map]);

  return <>{parsed}</>;
}
