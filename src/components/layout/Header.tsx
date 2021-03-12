import type { ReactElement, ReactNode, MouseEventHandler } from 'react';

import { useCallback, useRef } from 'react';
import {
  useToggle,
  useClickAway,
  useIsomorphicLayoutEffect as useLayoutEffect,
} from 'react-use';
import classNames from 'classnames';
import { useBreakpoint } from 'util/breakpoints';

import Link from 'components/Link';
import { MenuIcon, XIcon as CloseIcon } from '@heroicons/react/solid';

export default function Header(): ReactElement {
  const [isOpen, toggleOpen] = useToggle(false);

  const handleMenuClick = useCallback(() => toggleOpen(), [toggleOpen]);
  const handleClickCapture: MouseEventHandler = useCallback(
    (e) => {
      if (e.target instanceof HTMLAnchorElement) {
        toggleOpen(false);
      }
    },
    [toggleOpen]
  );

  // Close on click-away
  const headerRef = useRef<HTMLElement>(null);
  useClickAway(headerRef, () => isOpen && toggleOpen(false));

  // Close on breakpoint changes
  const breakpoint = useBreakpoint();
  useLayoutEffect(() => toggleOpen(false), [breakpoint, toggleOpen]);

  return (
    <header
      ref={headerRef}
      aria-label="Meny"
      className="text-lg leading-none bg-white border-b border-gray-400 shadow-md select-none"
      onClickCapture={handleClickCapture}
    >
      <nav
        aria-label="Navigasjon"
        className="container mx-auto px-4 md:flex md:justify-between"
      >
        <div className="flex justify-between w-full md:w-auto">
          <Link
            className="focus-primary px-4 py-3 h-full text-lg active:bg-primary-100 hover:bg-primary-50 focus:bg-primary-50 md:py-4 md:text-xl"
            href="/"
          >
            Bibel<span className="text-primary-600">studiet</span>
          </Link>
          <MenuToggle
            className="block md:hidden"
            open={isOpen}
            onToggle={handleMenuClick}
          />
        </div>
        <div className={classNames('md:flex', { hidden: !isOpen })}>
          <MenuLink href="/studiehefter">Studiehefter</MenuLink>
          <MenuLink href="/om">Om</MenuLink>
        </div>
      </nav>
    </header>
  );
}

interface MenuLinkProps {
  href: string;
  children: ReactNode;
}
function MenuLink({ children, href }: MenuLinkProps): ReactElement {
  return (
    <Link
      className="focus-primary block px-4 py-3 text-gray-900 active:bg-primary-100 hover:bg-primary-50 focus:bg-primary-50 md:pb-2 md:pt-6"
      href={href}
    >
      {children}
    </Link>
  );
}

interface MenuToggleProps {
  open: boolean;
  className?: string;
  onToggle: () => void;
}
function MenuToggle({
  open,
  className,
  onToggle,
}: MenuToggleProps): ReactElement {
  const Icon = open ? CloseIcon : MenuIcon;
  return (
    <button
      className={classNames(
        'px-4 py-3 text-gray-900 text-xl active:bg-primary-100 hover:bg-primary-50 focus:bg-primary-50 bg-transparent border border-solid border-transparent',
        className
      )}
      type="button"
      aria-label={open ? 'Lukk meny' : 'Åpne meny'}
      onClick={onToggle}
    >
      <Icon className="w-6 h-6 fill-current" />
    </button>
  );
}
