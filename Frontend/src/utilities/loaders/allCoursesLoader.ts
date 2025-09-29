import { redirect } from 'react-router';
import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { getTokens } from '../token';
import decodeToken from '../token/decodeToken';
import { ICoursesLoader } from '../types';

//TODO: replace fetch with 'all courses" fetch when it's in place

export const allCoursesLoader = (): ICoursesLoader => {
  const tokens = getTokens();
  if (!tokens?.accessToken) {
    throw redirect('/login');
  }

  const accessToken = decodeToken(tokens.accessToken);
  const role = accessToken.role;

  if (role !== 'Teacher') {
    throw redirect('/notauthorized');
  }

  return {
    courses: fetchWithToken(`${BASE_URL}/courses`),
  };
};
