import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { ICourse, ICourseModulesLoader } from '../types';

export const courseModulesLoader = (): ICourseModulesLoader => ({
  course: fetchWithToken<ICourse>(`${BASE_URL}/students/me/course-modules`),
});
