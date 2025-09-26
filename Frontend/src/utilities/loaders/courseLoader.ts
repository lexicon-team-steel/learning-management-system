import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { ICourse, ICourseLoader, IStudent } from '../types';

export const courseLoader = async (): Promise<ICourseLoader> => ({
  participants: fetchWithToken<IStudent[]>(`${BASE_URL}/students/me/course-classmates`),
  course: fetchWithToken<ICourse>(`${BASE_URL}/students/me/course-modules`),
});
