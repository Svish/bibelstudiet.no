import type { ReactElement } from 'react';
import Error from 'pages/_error';

export default function NotFoundErrorPage(): ReactElement {
  return <Error statusCode={404} />;
}
