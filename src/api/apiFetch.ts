import { isEmpty } from 'util/string';
import ApiError from './ApiError';

/**
 * Performs a GET-request towards our API.
 *
 * @param path Path, which will be appended to base URL.
 * @throws ApiError
 */
export default async function apiFetch<R>(path: string): Promise<R> {
  if (isEmpty(process.env.API)) {
    throw new Error('Missing API in .env');
  }

  const url = process.env.API + path;
  const res = await fetch(url);

  if (!res.ok) {
    throw new ApiError(await res.json());
  }

  return res.json() as Promise<R>;
}
