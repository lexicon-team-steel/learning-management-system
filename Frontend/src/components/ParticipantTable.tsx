import { ReactElement } from 'react';
import Table from './Table';
import { IParticipant } from '../utilities/types';
import ParticipantTableRow from './ParticipantTableRow';

interface IParticipantsTableProps {
  participants: IParticipant[];
  onDelete: (participant: IParticipant) => void;
}

const ParticipantsTable = ({ participants, onDelete }: IParticipantsTableProps): ReactElement => (
  <Table
    headers={['Namn', 'E-post', 'Roll', 'Åtgärder']}
    keyField="id"
    rows={participants}
    renderItem={(participant: IParticipant) => (
      <ParticipantTableRow participant={participant} onDelete={() => onDelete(participant)} />
    )}
  ></Table>
);

export default ParticipantsTable;
