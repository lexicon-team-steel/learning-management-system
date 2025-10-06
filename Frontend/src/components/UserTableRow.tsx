import { Chip, TableCell, TableRow } from '@mui/material';
import { ReactElement, useState } from 'react';
import { IParticipant } from '../utilities/types';
import EmailLink from './EmailLink';
import theme from '../styles/theme';
import ActionButtons from './ActionButtons';
import ConfirmDialog from './ConfirmDialog';
import AlertMessage from './AlertMessage';
import { useCrud } from '../utilities/hooks/useCrud';

interface IUserItem {
  user: IParticipant;
  onEdit: () => void;
}
const UserTableRow = ({ user, onEdit }: IUserItem): ReactElement => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { handleDelete } = useCrud<IParticipant>();

  const userName = `${user.firstName} ${user.lastName}`;
  const userRole = user.roles[0];
  const chipColor = userRole === 'Student' ? 'primary' : 'secondary';

  const handleConfirmDelete = () => {
    handleDelete(user);
    setConfirmOpen(false);
  };

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
        <ActionButtons onEdit={onEdit} onDelete={() => setConfirmOpen(true)} />
        <ConfirmDialog
          open={confirmOpen}
          entity="user"
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
