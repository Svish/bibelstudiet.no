import { HTMLAttributes } from 'react';

import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { getUrl, UrlSubject } from 'api/util';

import useClickable from './useClickable';

export type { UrlSubject } from 'api/util';

export default function useClickableSubject<T extends Element = Element>(
  role: 'link' | 'button',
  subject: UrlSubject
): HTMLAttributes<T> {
  const router = useRouter();
  const handler = useCallback(() => {
    void router.push(getUrl(subject));
  }, [router, subject]);
  return useClickable(role, handler);
}
