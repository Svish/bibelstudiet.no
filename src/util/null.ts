export type Null = null | undefined;

/**
 * Type guard checking that a value is not `null` or `undefined`.
 *
 * @param value Value to check.
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullablet
 */
export function isNotNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

/**
 * Assertion function checking that a value is not `null` or `undefined`.
 *
 * @param value Value to check.
 * @param throwError A function throwing an error, which will be called when the value is `null` or `undefined`.
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
 */
export function assertNotNull<T>(
  value: T,
  throwError: (value: T) => never
): asserts value is NonNullable<T> {
  if (value == null) throwError(value);
}

/**
 * @see https://github.com/microsoft/TypeScript/issues/32798
 */
export function isNull<T>(value: T | Null): value is Null {
  return value === null || value === undefined;
}
