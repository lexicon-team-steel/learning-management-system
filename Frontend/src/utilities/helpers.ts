import { redirect } from 'react-router';
import { getTokens } from './token';
import decodeToken from './token/decodeToken';
import { Entity } from './types';

export const formatDate = (date: string) => {
  const dateFromString = new Date(date);
  return new Intl.DateTimeFormat('sv-SE').format(dateFromString);
};

export const formatTime = (date: string): string => {
  const dateFromString = new Date(date);
  return new Intl.DateTimeFormat('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateFromString);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortByDate<T extends Record<string, any>>(
  items: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return items.sort((a, b) => {
    const timeA = new Date(a[key]).getTime();
    const timeB = new Date(b[key]).getTime();

    return order === 'asc' ? timeA - timeB : timeB - timeA;
  });
}

export const requireTeacherRole = () => {
  const tokens = getTokens();
  if (!tokens?.accessToken) {
    throw redirect('/login');
  }

  const accessToken = decodeToken(tokens.accessToken);
  const role = accessToken.role;

  if (role !== 'Teacher') {
    throw redirect('/notauthorized');
  }
};

export const scrollTop = () =>
  scrollTo({
    top: 0,
    behavior: 'smooth',
  });

export const translateEntity: Record<Entity, string> = {
  activity: 'aktiviteten',
  user: 'användaren',
  course: 'kursen',
  module: 'modulen',
};
export const capitalize = (s?: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

export const translateRole = (role: string) => ({ Teacher: 'Lärare' })[role] ?? role;
