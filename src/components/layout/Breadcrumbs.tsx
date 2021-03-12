import { ReactElement, useMemo } from 'react';

import { getBreadcrumbs, BreadcrumbSubject } from 'api/util';

import Link from 'components/Link';
import { ChevronLeftIcon as SeparatorIcon } from '@heroicons/react/solid';
import { HomeIcon } from '@heroicons/react/outline';

export type Breadcrumb = [href: string, text: string];

type Props = { crumbs?: Breadcrumb[] } | { subject: BreadcrumbSubject };

export default function Breadcrumbs(props: Props): ReactElement {
  const crumbs = useMemo<Breadcrumb[]>(
    () =>
      'subject' in props ? getBreadcrumbs(props.subject) : props.crumbs ?? [],
    [props]
  );

  return (
    <nav aria-label="Brødsti" className="mb-2 select-none">
      <ol className="font-xs flex flex-wrap gap-1 text-gray-500">
        <li className="inline-flex gap-1 items-center">
          <Link
            href="/"
            aria-label="Forsiden"
            className="focus-secondary hover:text-gray-900"
          >
            <HomeIcon aria-hidden className="w-6 h-6" />
          </Link>
        </li>
        {crumbs.map(([href, text], i) => (
          <li key={i} className="inline-flex gap-1 items-center">
            <SeparatorIcon
              aria-hidden
              className="translate-y-[1px] w-5 h-5 text-gray-300 transform"
            />
            <Link
              href={href}
              className="focus-secondary hover:text-gray-900 whitespace-nowrap"
            >
              {text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
