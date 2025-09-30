import { Chip, TableCell, TableRow } from '@mui/material';
import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import EmailLink from './EmailLink';

interface IUserItem {
  user: IParticipant;
}
const UserTableItem = ({ user }: IUserItem): ReactElement => {
  const userName = user.lastName + '' + user.firstName;
  const userRole = user.role[0];
  const chipColor = userRole === 'Student' ? 'primary' : 'secondary';

  return (
    <TableRow sx={{ '&:last-child td': { border: 0 } }}>
      <TableCell>{userName}</TableCell>
      <TableCell>
        <EmailLink email={user.email} />
      </TableCell>
      <TableCell>
        <Chip label={userRole} color={chipColor} />
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default UserTableItem;
