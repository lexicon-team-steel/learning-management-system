import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { IActivity, ICourse, IDashboardLoader } from '../types';

export const dashboardLoader = (): IDashboardLoader => {
  return {
    courses: fetchWithToken<ICourse[]>(`${BASE_URL}/courses`),
    activities: fetchWithToken<IActivity[]>(`${BASE_URL}/activities`),
  };
};
