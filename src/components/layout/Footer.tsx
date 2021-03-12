import type { ReactElement, ReactNode } from 'react';

import Link from 'components/Link';

export default function Footer(): ReactElement {
  return (
    <footer className="container mt-7 mx-auto px-8 py-3 text-gray-500 text-xs border-t border-gray-200 select-none">
      <aside className="space-y-2 md:flex md:justify-between md:space-y-0">
        <div>
          <Item>
            Copyright ©{' '}
            <FooterLink href="https://www.norskbokforlag.no">
              Norsk Bokforlag
            </FooterLink>
          </Item>
        </div>
        <div className="space-x-2">
          <Item>
            <FooterLink href="https://adventist.no">
              Syvendedags Adventistkirken
            </FooterLink>
          </Item>
          <Item className="pl-2">
            <FooterLink href="https://sdaweb.no">SDAweb</FooterLink>
          </Item>
        </div>
      </aside>
    </footer>
  );
}

function Item(props: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  return <span {...props} />;
}

function FooterLink(props: {
  href: string;
  children: ReactNode;
}): ReactElement {
  return <Link className="focus-secondary hover:text-gray-900" {...props} />;
}
