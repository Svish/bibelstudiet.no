import type { ReactElement } from 'react';

import classNames from 'classnames';

import { MenuIcon, XIcon as CloseIcon } from '@heroicons/react/solid';

interface Props {
  open: boolean;
  className?: string;
  onToggle: () => void;
}
export default function MenuToggleButton({
  open,
  className,
  onToggle,
}: Props): ReactElement {
  const Icon = open ? CloseIcon : MenuIcon;
  return (
    <button
      className={classNames(
        'focus-primary px-4 py-3 text-gray-900 text-xl active:bg-primary-100 hover:bg-primary-50 bg-transparent border border-solid border-transparent',
        className
      )}
      type="button"
      aria-label={open ? 'Lukk meny' : 'Åpne meny'}
      onClick={onToggle}
    >
      <Icon aria-hidden className="w-6 h-6 fill-current" />
    </button>
  );
}
