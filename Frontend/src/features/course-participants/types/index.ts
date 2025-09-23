import { IStudent } from '../../../utilities/types';

export interface IParticipantLoader {
  participants: Promise<IStudent[]>;
}
