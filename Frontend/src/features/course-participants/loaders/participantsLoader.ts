import { fetchWithToken } from '../../../utilities/api/fetchWithToken';
import { BASE_URL } from '../../../utilities/constants';
import { IStudent } from '../../../utilities/types';
import { IParticipantLoader } from '../types';

export const participantsLoader = (): IParticipantLoader => ({
  participants: fetchWithToken<IStudent[]>(`${BASE_URL}/students/me/course-classmates`),
});
