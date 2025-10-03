import { Chip, TableCell, TableRow } from '@mui/material';
import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import EmailLink from './EmailLink';
import theme from '../styles/theme';
import ActionButtons from './ActionButtons';

interface IUserItem {
  user: IParticipant;
  onEdit: () => void;
  onDelete: () => void;
}
const UserTableRow = ({ user, onEdit, onDelete }: IUserItem): ReactElement => {
  const userName = `${user.firstName} ${user.lastName}`;
  const userRole = user.roles[0];
  const chipColor = userRole === 'Student' ? 'primary' : 'secondary';

  return (
    <TableRow>
      <TableCell>{userName}</TableCell>
      <TableCell>
        <EmailLink email={user.email} />
      </TableCell>
      <TableCell>
        <Chip label={userRole} color={chipColor} />
      </TableCell>
      <TableCell align="right" sx={{ paddingX: theme.spacing(1) }}>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
