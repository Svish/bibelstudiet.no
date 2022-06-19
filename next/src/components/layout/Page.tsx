import type { ReactElement, ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
  className?: string;
}

export default function Page(props: PageProps): ReactElement {
  return (
    <main className="container mx-auto px-8 py-8">
      <div className={props.className}>{props.children}</div>
    </main>
  );
}
