import type { HTMLAttributes } from 'react';

import { useMemo, useRef } from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from 'react-use';

export default function useClickable<T extends Element = Element>(
  role: 'link' | 'button',
  onClick: () => void
): HTMLAttributes<T> {
  const handler = useRef(onClick);

  useLayoutEffect(() => {
    handler.current = onClick;
  }, [onClick]);

  return useMemo(
    () => ({
      role,
      tabIndex: 0,
      onClick: () => {
        handler.current();
      },
      onKeyDown: (e) => {
        e.key === 'Enter' && handler.current();
      },
    }),
    [role]
  );
}
