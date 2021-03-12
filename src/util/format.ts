import LOCALE from 'locale';
import { Null } from './null';

/**
 * @param subject A subject, which might be null
 * @returns `"–"` if `subject` is `null`; otherwise `subject` is returned as-is
 */
export function formatNullable(subject: number | string | Null): string {
  return subject == null ? '–' : String(subject);
}

/**
 * @param date Date or string in ISO-format, e.g. `"2005-06-01T00:00:00"`
 * @param format Dateformat to use, defaults to `short`
 * @returns E.g. `"01.06.2005"` or `"01. juni 2005"`
 * @see https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato/#dato
 */
export function formatDate(
  date: Date | string | Null,
  format: 'short' | 'long' | Intl.DateTimeFormatOptions = 'short'
): string {
  if (date == null) {
    return formatNullable(date);
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (typeof format === 'string') {
    format = {
      day: '2-digit',
      month: format === 'short' ? '2-digit' : 'long',
      year: 'numeric',
    };
  }

  return date.toLocaleDateString(LOCALE, format).replace(/ /g, ' ');
}

/**
 * @param date Date or string in ISO-format, e.g. `"2005-06-01T12:34:45"`
 * @returns E.g. `"12:34"`
 * @see https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato/#klokkeslett
 */
export function formatTime(time: Date | string | Null): string {
  if (time == null) {
    return formatNullable(time);
  }

  if (typeof time === 'string') {
    time = new Date(time);
  }

  return time.toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export type DecimalFormat = 'integer' | 'decimal' | number;

/**
 * @param number The number to format, e.g. `1234.56`
 * @param format To format as integer (default), decimal, or a custom number of decimal digits
 * @returns When `integer` => `1 234`, and if `decimal` => `1 234,56`
 */
export function formatNumber(
  number: number | Null,
  format: DecimalFormat = 'integer'
): string {
  if (number == null) return formatNullable(number);

  const digits = format === 'integer' ? 0 : format === 'decimal' ? 2 : format;

  return number.toLocaleString(LOCALE, {
    style: 'decimal',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/**
 * Formats an SI number with its prefix and unit.
 *
 * @param number Number to format.
 * @param unit SI Unit (`B`, `m`, `g`, ...)
 * @param format Decimal format for the number
 * @param kilo How many in a kilo (1000 or 1024)
 */
export function formatSiNumber(
  number: number,
  unit: string,
  format: DecimalFormat = 'integer',
  kilo: 1000 | 1024 = 1000
): string {
  let i = 0;
  for (; number / kilo > 0.9; i++, number /= kilo);
  return formatNumber(number, format) + ' ' + prefixes[i] + unit;
}

const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'] as const;
