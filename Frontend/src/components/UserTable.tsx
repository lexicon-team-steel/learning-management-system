import { ReactElement } from 'react';
import Table from './Table';
import { IParticipant } from '../utilities/types';
import UserTableRow from './UserTableRow';

interface IUserTableProps {
  users: IParticipant[];
  onEdit: (user: IParticipant) => void;
  onDelete: (user: IParticipant) => void;
}

const UserTable = ({ users, onEdit, onDelete }: IUserTableProps): ReactElement => (
  <Table
    headers={['Namn', 'E-post', 'Roll', 'Åtgärder']}
    keyField="id"
    rows={users}
    renderItem={(user: IParticipant) => (
      <UserTableRow user={user} onEdit={() => onEdit(user)} onDelete={() => onDelete(user)} />
    )}
  ></Table>
);

export default UserTable;
