import 'styles/tailwind.css';

import type { ReactElement } from 'react';
import type { AppProps } from 'next/app';

import { isDev } from 'env';
import { useBreakpointDebug } from 'util/breakpoints';

import Layout from 'components/layout/Layout';

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  const breakpointDebug = useBreakpointDebug();

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {isDev && (
        <div className="fixed bottom-0 right-0 px-2 py-1 bg-white opacity-70">
          {breakpointDebug}
        </div>
      )}
    </>
  );
}
