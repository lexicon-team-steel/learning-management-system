import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { IDashboardLoader } from '../types';

export const dashboardLoader = (): IDashboardLoader => ({ course: fetchWithToken(`${BASE_URL}/students/me/course`) });
