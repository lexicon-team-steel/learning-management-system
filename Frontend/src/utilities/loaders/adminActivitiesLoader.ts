import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { IAdminActivitiesLoader } from '../types';
import { requireTeacherRole } from '../helpers';
import { LoaderFunctionArgs } from 'react-router';

export const adminActivitiesLoader = async ({ params }: LoaderFunctionArgs): Promise<IAdminActivitiesLoader> => {
  requireTeacherRole();
  return {
    activityTypes: await fetchWithToken(`${BASE_URL}/admin/activityTypes`),
    module: await fetchWithToken(`${BASE_URL}/admin/modules/${params.id}`),
  };
};
