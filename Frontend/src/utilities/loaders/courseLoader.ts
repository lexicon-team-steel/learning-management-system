import { LoaderFunctionArgs, redirect } from 'react-router';
import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { ICourse, ICourseLoader, IParticipant } from '../types';

export const courseLoader = async ({ params }: LoaderFunctionArgs): Promise<ICourseLoader> => ({
  participants: fetchWithToken<IParticipant[]>(`${BASE_URL}/courses/${params.id}/participants?role=student`),
  course: fetchWithToken<ICourse>(`${BASE_URL}/courses/${params.id}`),
});

export const defaultCourseLoader = async () => {
  const courses = await fetchWithToken<ICourse[]>(`${BASE_URL}/courses`);
  // if (!courses.length) {
  //   TODO: redirect to error page
  // }
  return redirect(`/courses/${courses[0].id}`);
};
