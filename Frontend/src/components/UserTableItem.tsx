import { TableCell, TableRow } from '@mui/material';
import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import EmailLink from './EmailLink';

interface IUserItem {
  user: IParticipant;
}
const UserTableItem = ({ user }: IUserItem): ReactElement => {
  const fullName = user.lastName + '' + user.firstName;
  return (
    <TableRow sx={{ '&:last-child td': { border: 0 } }}>
      <TableCell>{fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default UserTableItem;
