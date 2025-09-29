import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { ICoursesLoader } from '../types';

export const dashboardLoader = (): ICoursesLoader => ({ courses: fetchWithToken(`${BASE_URL}/courses`) });
