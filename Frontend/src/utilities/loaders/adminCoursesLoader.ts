import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { IAdminCoursesLoader } from '../types';
import { requireTeacherRole } from '../helpers';

export const adminCoursesLoader = async (): Promise<IAdminCoursesLoader> => {
  requireTeacherRole();
  return {
    courses: await fetchWithToken(`${BASE_URL}/admin/courses`),
  };
};
