import { ICourse, IParticipant, IUser } from './types';

export const TOKENS = 'tokens';
export const BASE_URL = 'http://localhost:5166/api';
export const GUEST_USER: IUser = {
  fullName: '',
  id: '',
  role: 'Guest',
};
export const EMPTY_PARTICIPANT: IParticipant = {
  id: '',
  lastName: '',
  firstName: '',
  email: '',
  roles: ['Student'],
};

export const EMPTY_COURSE: ICourse = { id: '', name: '', description: '', startDate: '', endDate: '' };
