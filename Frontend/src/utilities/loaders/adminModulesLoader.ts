import { LoaderFunctionArgs } from 'react-router';
import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { requireTeacherRole } from '../helpers';
import { IAdminModulesLoader } from '../types';

export const adminModulesLoader = async ({ params }: LoaderFunctionArgs): Promise<IAdminModulesLoader> => {
  requireTeacherRole();
  return {
    courseWithModules: await fetchWithToken(`${BASE_URL}/admin/courses/${params.courseId}`),
  };
};
