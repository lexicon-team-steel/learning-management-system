import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { requireTeacherRole } from '../helpers';

export async function adminUsersLoader() {
  requireTeacherRole();

  return {
    users: fetchWithToken(`${BASE_URL}/admin/users`),
  };
}
