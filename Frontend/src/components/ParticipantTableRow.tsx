import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import EmailLink from './EmailLink';
import theme from '../styles/theme';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

interface IParticipantItem {
  participant: IParticipant;
  onDelete: () => void;
}
const ParticipantTableRow = ({ participant, onDelete }: IParticipantItem): ReactElement => {
  const userName = `${participant.firstName} ${participant.lastName}`;
  const userRole = participant.roles[0];
  const chipColor = userRole === 'Student' ? 'primary' : 'secondary';

  return (
    <TableRow>
      <TableCell>{userName}</TableCell>
      <TableCell>
        <EmailLink email={participant.email} />
      </TableCell>
      <TableCell>
        <Chip label={userRole} color={chipColor} />
      </TableCell>
      <TableCell align="right" sx={{ paddingX: theme.spacing(1) }}>
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ParticipantTableRow;
