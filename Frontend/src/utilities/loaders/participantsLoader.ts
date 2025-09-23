import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { IParticipantLoader, IStudent } from '../types';

export const participantsLoader = (): IParticipantLoader => ({
  participants: fetchWithToken<IStudent[]>(`${BASE_URL}/students/me/course-classmates`),
});
