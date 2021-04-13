import type { Subject, Day } from 'api/types';
import type { Breadcrumb } from 'components/layout/Breadcrumbs';

/**
 * Get URL for a subject.
 */
export function getUrl(subject: UrlSubject): string {
  if (!Array.isArray(subject)) subject = subject.id;
  return '/' + subject.join('/');
}

export type UrlSubject = string[] | { id: string[] };

/**
 * Get name for a subject.
 */
export function getName(
  subject: Pick<NameSubject, 'id'> | NameSubject['id']
): string {
  const id = Array.isArray(subject) ? subject : subject.id;
  switch (id.length) {
    case 1: {
      const [year] = id;
      return year;
    }

    case 2: {
      const [, quarter] = id;
      return `${quarter}. Kvartal`;
    }

    case 3: {
      const [, , week] = id;
      return `Studium ${week}`;
    }
  }
}

export type NameSubject = Exclude<Subject, Day>;

/**
 * Get breadcrumbs for a subject.
 */
export function getBreadcrumbs(subject: BreadcrumbSubject): Breadcrumb[] {
  const crumbs: Breadcrumb[] = [];
  const id: BreadcrumbSubject['id'] = [...subject.id];
  id.pop();
  while (id.length > 0) {
    crumbs.unshift([getUrl(id), getName(id)]);
    id.pop();
  }

  return [['/studiehefter', 'Studiehefter'], ...crumbs];
}
export type BreadcrumbSubject = NameSubject;
