import { Components } from 'util/XmlToReact';

import Forword from './Forword';
import Title from './Title';
import About from './About';
import Ref from './Ref';

const components: Components = {
  forword: Forword,
  title: Title,
  about: About,
  r: Ref,
} as const;

export default components;
