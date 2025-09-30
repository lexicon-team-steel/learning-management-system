import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import EmailLink from './EmailLink';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';

interface IUserItem {
  user: IParticipant;
  onEdit: () => void;
  onDelete: () => void;
}
const UserTableItem = ({ user, onEdit, onDelete }: IUserItem): ReactElement => {
  const userName = user.lastName + '' + user.firstName;
  const userRole = user.role[0];
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
      <TableCell>
        <IconButton onClick={onEdit} aria-label="edit">
          <EditIcon fontSize="small" color="primary" />
        </IconButton>
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserTableItem;
