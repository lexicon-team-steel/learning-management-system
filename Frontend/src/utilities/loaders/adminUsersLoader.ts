import { LoaderFunctionArgs } from 'react-router';
import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { requireTeacherRole } from '../helpers';
import { IPagedLoader, IParticipant } from '../types';

export const adminUsersLoader = async ({ request }: LoaderFunctionArgs): Promise<IPagedLoader<IParticipant>> => {
  requireTeacherRole();

  const url = new URL(request.url);
  const pageIndex = Number(url.searchParams.get('pageIndex')) || 1;
  const pageSize = Number(url.searchParams.get('pageSize')) || 5;

  const response = (await fetchWithToken(
    `${BASE_URL}/admin/users?pageIndex=${pageIndex}&pageSize=${pageSize}`
  )) as IPagedLoader<IParticipant>;
  return { ...response };
};
