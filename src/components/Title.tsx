import type { ReactElement } from 'react';

import Head from 'next/head';

interface TitleProps {
  title: null | string | string[];
}

const TITLE = 'Bibelstudiet.no';

export default function Title({ title }: TitleProps): ReactElement {
  title = title == null ? [] : typeof title === 'string' ? [title] : title;
  title = [...title, TITLE].join(' – ');
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
