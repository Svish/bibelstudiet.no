import type { ReactElement } from 'react';
import Error from 'pages/_error';

export default function InternalErrorPage(): ReactElement {
  return <Error statusCode={500} />;
}
