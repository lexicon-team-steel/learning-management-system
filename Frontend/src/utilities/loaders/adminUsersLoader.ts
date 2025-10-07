import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { requireTeacherRole } from '../helpers';
import { IPagedLoader, IParticipant } from '../types';

export const adminUsersLoader = async (): Promise<IPagedLoader<IParticipant>> => {
  requireTeacherRole();

  const response = (await fetchWithToken(`${BASE_URL}/admin/users`)) as IPagedLoader<IParticipant>;
  return { ...response };
};
