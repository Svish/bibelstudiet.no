import type { CSSProperties } from 'react';
import type { Null } from './null';

/**
 * @returns `true` if `input` is `null` or empty string; otherwise `false`
 */
export function isEmpty(input: string | Null): input is Null | '' {
  return input == null || input === '';
}

/**
 * @returns `true` if `input` is not `null` and not an empty string; otherwise `false`
 */
export function isNotEmpty(input: string | Null): input is string {
  return !isEmpty(input);
}

/**
 * @see https://stackoverflow.com/a/55292366/39321
 */
export function trim(str: string, ch: string): string {
  let start = 0;
  let end = str.length;
  while (start < end && str[start] === ch) ++start;
  while (end > start && str[end - 1] === ch) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
}

/**
 * @see https://gist.github.com/goldhand/70de06a3bdbdb51565878ad1ee37e92b#gistcomment-3621492
 */
export function toStyleObject(styleString: string): CSSProperties {
  return styleString.split(';').reduce((acc, style) => {
    const colonPosition = style.indexOf(':');

    if (colonPosition === -1) {
      return acc;
    }

    const camelCaseProperty = style
        .substr(0, colonPosition)
        .trim()
        .replace(/^-ms-/, 'ms-')
        .replace(/-./g, (c) => c.substr(1).toUpperCase()),
      value = style.substr(colonPosition + 1).trim();

    return isNotEmpty(value) ? { ...acc, [camelCaseProperty]: value } : acc;
  }, {}) as CSSProperties;
}
