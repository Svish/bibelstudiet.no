import type { ReactElement } from 'react';

import Page from 'components/layout/Page';
import Title from 'components/Title';
import Heading from 'components/Heading';

// TODO: getServerProps or getStaticProps -> /dates -> find week -> get memory verse (fallback block?)

export default function Home(): ReactElement {
  return (
    <Page>
      <Title title={null} />
      <Heading variant="h1" title="Velkommen til bibelstudium" />
      <aside className="px-12 py-6 my-12 text-4xl text-center bg-primary-600 text-primary-50">
        ... under utvikling ...
      </aside>
    </Page>
  );
}
