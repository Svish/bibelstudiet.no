import type { ReactElement, ReactNode } from 'react';

import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        ></meta>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
