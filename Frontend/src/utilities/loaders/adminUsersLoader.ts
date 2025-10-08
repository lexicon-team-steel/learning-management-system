import { LoaderFunctionArgs } from 'react-router';
import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { requireTeacherRole } from '../helpers';
import { IPagedLoader, IParticipant } from '../types';

export const adminUsersLoader = async ({ request }: LoaderFunctionArgs): Promise<IPagedLoader<IParticipant>> => {
  requireTeacherRole();

  const url = new URL(request.url);
  const name = url.searchParams.get('name') ?? '';
  const role = url.searchParams.get('role') ?? '';
  const pageIndex = url.searchParams.get('pageIndex') ?? '';
  const pageSize = url.searchParams.get('pageSize') ?? '';

  const query = new URLSearchParams();
  if (name) query.append('name', name);
  if (role) query.append('role', role);
  if (pageIndex) query.append('pageIndex', pageIndex);
  if (pageSize) query.append('pageSize', pageSize);

  const response = (await fetchWithToken(`${BASE_URL}/admin/users?${query.toString()}`)) as IPagedLoader<IParticipant>;
  return { ...response };
};
