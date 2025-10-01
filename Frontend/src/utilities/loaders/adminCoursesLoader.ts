import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { ICoursesLoader } from '../types';
import { requireTeacherRole } from '../helpers';

export const adminCoursesLoader = (): ICoursesLoader => {
  requireTeacherRole();
  return {
    courses: fetchWithToken(`${BASE_URL}/admin/courses`),
  };
};
