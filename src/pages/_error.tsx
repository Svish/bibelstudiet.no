import type { ReactElement } from 'react';
import type { NextPageContext } from 'next';

import Page from 'components/layout/Page';
import Heading from 'components/Heading';

const STATUS_CODES: Record<number, string | undefined> = {
  0: 'Ukjent feil',
  404: 'Siden finnes ikke.',
  500: 'Intern feil.',
};

interface Props {
  statusCode: keyof typeof STATUS_CODES;
}

export default function ErrorPage({ statusCode }: Props): ReactElement {
  const message = STATUS_CODES[statusCode] ?? STATUS_CODES[0];

  return (
    <Page>
      <Heading variant="h1" className="centered">
        {statusCode}
      </Heading>
      <p>{message}</p>
    </Page>
  );
}

ErrorPage.getInitialProps = (ctx: NextPageContext): Props => {
  const { res, err } = ctx;

  return {
    statusCode: res?.statusCode ?? err?.statusCode ?? 500,
  };
};
