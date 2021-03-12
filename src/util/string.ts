import { Null } from './null';

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
