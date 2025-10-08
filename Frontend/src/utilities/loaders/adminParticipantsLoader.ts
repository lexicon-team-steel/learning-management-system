import { LoaderFunctionArgs } from 'react-router';
import { IAdminParticipantsLoader } from '../types';
import { requireTeacherRole } from '../helpers';
import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';

export const adminParticipantsLoader = async ({ params }: LoaderFunctionArgs): Promise<IAdminParticipantsLoader> => {
  requireTeacherRole();

  return {
    courseWithParticipants: await fetchWithToken(`${BASE_URL}/admin/courses/${params.courseId}/participants`),
  };
};
