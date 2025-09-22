import { ReactElement } from 'react';
import { Participant } from '../types';
import ParticipantItem from './ParticipantItem';
import { Divider, List } from '@mui/material';

interface IParticipantsListProps {
  participants: Participant[];
}

const ParticipantsList = ({ participants }: IParticipantsListProps): ReactElement => {
  return (
    <List>
      {participants.map((participant, idx) => (
        <>
          <ParticipantItem key={participant.email} participant={participant} />
          {idx < participants.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default ParticipantsList;
