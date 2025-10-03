import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { requireTeacherRole } from '../helpers';
import { IAdminUsersLoader } from '../types';

export function adminUsersLoader(): IAdminUsersLoader {
  requireTeacherRole();

  return {
    users: fetchWithToken(`${BASE_URL}/admin/users`),
  };
}
