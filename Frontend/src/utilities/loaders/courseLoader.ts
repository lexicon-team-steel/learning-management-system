import { LoaderFunctionArgs } from 'react-router';
import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { ICourse, ICourseLoader, IParticipant } from '../types';

export const courseLoader = async ({ params }: LoaderFunctionArgs): Promise<ICourseLoader> => ({
  participants: fetchWithToken<IParticipant[]>(`${BASE_URL}/courses/${params.id}/participants?role=student`),
  course: fetchWithToken<ICourse>(`${BASE_URL}/courses/${params.id}`),
});
