import { redirect } from 'react-router';
import { getTokens } from './token';
import decodeToken from './token/decodeToken';

export const formatDate = (date: string) => {
  const dateFromString = new Date(date);
  return new Intl.DateTimeFormat('sv-SE').format(dateFromString);
};

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
