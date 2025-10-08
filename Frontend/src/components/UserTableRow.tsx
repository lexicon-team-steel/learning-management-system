import { Chip, TableCell, TableRow } from '@mui/material';
import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import EmailLink from './EmailLink';
import theme from '../styles/theme';
import ActionButtons from './ActionButtons';
import { userChipColor, userFullName } from '../utilities/helpers';

interface IUserItem {
  user: IParticipant;
  onEdit: () => void;
  onDelete: () => void;
}
const UserTableRow = ({ user, onEdit, onDelete }: IUserItem): ReactElement => {
  return (
    <TableRow>
      <TableCell>{userFullName(user)}</TableCell>
      <TableCell>
        <EmailLink email={user.email} />
      </TableCell>
      <TableCell>
        <Chip label={user.roles[0]} color={userChipColor(user)} />
      </TableCell>
      <TableCell align="right" sx={{ paddingX: theme.spacing(1) }}>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
