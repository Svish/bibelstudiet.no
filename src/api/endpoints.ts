import fetch from 'api/apiFetch';
import { stringify } from 'querystring';

import { Root, Year, Quarter, Week, Day } from './types';
export type { Root, Year, Quarter, Week, Day } from './types';

type PathSegment = string;
const path = (...segments: PathSegment[]): string => '/' + segments.join('/');

export async function getIndex(type: 'year'): Promise<Year['id'][]>;
export async function getIndex(type: 'quarter'): Promise<Quarter['id'][]>;
export async function getIndex(type: 'week'): Promise<Week['id'][]>;
export async function getIndex(
  type: 'year' | 'quarter' | 'week'
): Promise<unknown> {
  return fetch(path('index') + '?' + stringify({ type }));
}

export async function getById(): Promise<Root>;
export async function getById(id: Year['id']): Promise<Year>;
export async function getById(id: Quarter['id']): Promise<Quarter>;
export async function getById(id: Week['id']): Promise<Week>;
export async function getById(id: Day['id']): Promise<Day>;
export async function getById(id: PathSegment[] = []): Promise<unknown> {
  return fetch<Omit<Year | Quarter | Week | Day, 'name'>>(path(...id));
}
