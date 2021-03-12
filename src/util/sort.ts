import LOCALE from 'locale';
import { Null } from './null';

const multiplier = { asc: 1, desc: -1 } as const;

export type Direction = keyof typeof multiplier;

export type CompareFn<T> = (x: T, y: T) => number;
export type ValueFn<T, R> = (o: T) => R;

/**
 * Returns a new list, with the items from `subject` sorted.
 */
export function sort<T>(subject: T[] | Null, compareFn: CompareFn<T>): T[] {
  return subject != null ? [...subject].sort(compareFn) : [];
}

/**
 * Creates a value getter function for a given key.
 */
export function field<T, K extends keyof T>(key: K): (o: T) => T[K] {
  return (o: T) => o[key];
}

/**
 * Sort objects by a multiple criteria.
 *
 * @param compareFn Functions to sort by.
 */
export function multiple<T>(...compareFn: CompareFn<T>[]): CompareFn<T> {
  return (x, y) => {
    for (const c of compareFn) {
      const result = c(x, y);
      if (result !== 0) return result;
    }
    return 0;
  };
}

/**
 * Sort objects by a key of type `number`, from lowest to highest, `null` always last.
 *
 * @param key Key to sort by.
 * @param direction Defaults to `asc`
 */
export function byNumber<T>(
  get: ValueFn<T, number | Null>,
  direction: Direction = 'asc'
): CompareFn<T> {
  return (x, y) => {
    const xv = get(x);
    const yv = get(y);
    return xv === yv
      ? 0
      : xv == null
      ? 1
      : yv == null
      ? -1
      : (xv - yv) * multiplier[direction];
  };
}

/**
 * Sort objects by a key of type `Date`, from oldest to newest, `null` considered newest.
 *
 * @param key Key to sort by.
 * @param direction Defaults to `asc`
 */
export function byDate<T>(
  get: ValueFn<T, Date | Null>,
  direction: Direction = 'asc'
): CompareFn<T> {
  const getTime: ValueFn<T, number | undefined> = (o) => get(o)?.getTime();

  return (x, y) => {
    const xv = getTime(x);
    const yv = getTime(y);
    return xv === yv
      ? 0
      : xv == null
      ? multiplier[direction]
      : yv == null
      ? -multiplier[direction]
      : (xv - yv) * multiplier[direction];
  };
}

/**
 * Sort objects by a key of type `string`, alphabetically and numerically, `null` always last.
 *
 * @param key Key to sort by.
 * @param direction Defaults to `asc`
 */
export function byString<T>(
  get: ValueFn<T, string | Null>,
  direction: Direction = 'asc'
): CompareFn<T> {
  const collator = new Intl.Collator(LOCALE, {
    usage: 'sort',
    numeric: true, // 2 before 10, etc.
  });

  return (x, y) => {
    const xv = get(x);
    const yv = get(y);
    return xv === yv
      ? 0
      : xv == null
      ? 1
      : yv == null
      ? -1
      : collator.compare(xv, yv) * multiplier[direction];
  };
}

/**
 * Sort objects by a key of type `boolean`, with `false` before `true`, `null` always last.
 *
 * @param key Key to sort by.
 * @param direction Defaults to `asc`
 */
export function byBoolean<T>(
  get: ValueFn<T, boolean | Null>,
  direction: Direction = 'asc'
): CompareFn<T> {
  return (x, y) => {
    const xv = get(x);
    const yv = get(y);
    return xv === yv
      ? 0
      : xv == null
      ? 1
      : yv == null
      ? -1
      : xv
      ? multiplier[direction]
      : -multiplier[direction];
  };
}
