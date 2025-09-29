import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { IDashboardLoader } from '../types';

export const dashboardLoader = (): IDashboardLoader => ({ courses: fetchWithToken(`${BASE_URL}/courses`) });
