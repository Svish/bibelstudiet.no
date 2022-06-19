import type { ReactElement, ReactNode } from 'react';
import { H } from 'components/Heading';

interface Props {
  children?: ReactNode;
}

export default function Questions({ children }: Props): ReactElement {
  return (
    <div className="box">
      <H className="!mt-3">Spørsmål til drøftelse</H>
      <ol>{children}</ol>
    </div>
  );
}
