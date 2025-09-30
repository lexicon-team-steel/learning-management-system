import { IParticipant } from '../types';

export const mockUsers: IParticipant[] = [
  {
    id: '7c4d7d64-9b58-4b7c-8dd6-2c5bfb5f99aa',
    lastName: 'Andersson',
    firstName: 'Maria',
    email: 'maria.andersson@example.com',
    role: ['Student'],
  },
  {
    id: '1e8f326a-5f3b-4a65-8cb5-8d2c18ef7c8e',
    lastName: 'Johansson',
    firstName: 'Erik',
    email: 'erik.johansson@example.com',
    role: ['Teacher'],
  },
  {
    id: '3d92f477-4af7-4b6f-bdc5-94b1c64a28f1',
    lastName: 'Nilsson',
    firstName: 'Emma',
    email: 'emma.nilsson@example.com',
    role: ['Student'],
  },
  {
    id: 'bafabfd2-65cd-4e57-9e71-85734db8e90d',
    lastName: 'Svensson',
    firstName: 'Karl',
    email: 'karl.svensson@example.com',
    role: ['Teacher'],
  },
  {
    id: 'c4caa0f1-1d63-4b5a-baae-2d7e3c4e3265',
    lastName: 'Berg',
    firstName: 'Lisa',
    email: 'lisa.berg@example.com',
    role: ['Student'],
  },
];
