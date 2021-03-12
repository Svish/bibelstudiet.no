import type { ReactElement } from 'react';
import type { Pdf, Audio } from 'api/types';

import { formatSiNumber } from 'util/format';

import { DocumentDownloadIcon as DownloadIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

interface Props {
  file: Pdf | Audio;
  filename: string;
  children: string;
  className?: string;
}

/**
 * @see https://blog.logrocket.com/programmatic-file-downloads-in-the-browser-9a5186298d5c/
 * @see https://tailwindcss.com/docs/animation
 */
export default function DownloadButton({
  file,
  filename,
  children,
  className,
}: Props): ReactElement {
  const href = 'href' in file ? file.href : file.src;
  const size = formatSiNumber(file.size, 'B', 2, 1024);
  // TODO: Download in background?
  //  Swap icon with download spinner
  //  Trigger file save when finished

  //  Reuse CardLink ... ?
  return (
    <a
      href={href}
      className={classNames(
        'focus-secondary flex items-center justify-between px-4 py-2 w-52 active:bg-secondary-100 hover:bg-secondary-50 bg-white border border-gray-300 hover:border-secondary-400 focus:border-secondary-400 rounded-lg shadow-sm cursor-pointer',
        className
      )}
    >
      <span className="flex flex-col">
        <span className="text-sm font-semibold">{children}</span>
        <span className="text-gray-500 text-xs">{size}</span>
      </span>
      <DownloadIcon aria-hidden className="w-9 h-9 text-secondary-400" />
    </a>
  );
}
