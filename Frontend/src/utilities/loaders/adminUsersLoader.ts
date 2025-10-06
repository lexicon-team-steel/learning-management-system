import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { requireTeacherRole } from '../helpers';
import { IAdminUsersLoader } from '../types';

export const adminUsersLoader = async (): Promise<IAdminUsersLoader> => {
  requireTeacherRole();

  return {
    users: await fetchWithToken(`${BASE_URL}/admin/users`),
  };
};
