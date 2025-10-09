import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import EmailLink from './EmailLink';
import theme from '../styles/theme';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { translateRole, userChipColor, userFullName } from '../utilities/helpers';

interface IParticipantItem {
  participant: IParticipant;
  onDelete: () => void;
}
const ParticipantTableRow = ({ participant, onDelete }: IParticipantItem): ReactElement => {
  return (
    <TableRow>
      <TableCell>{userFullName(participant)}</TableCell>
      <TableCell>
        <EmailLink email={participant.email} />
      </TableCell>
      <TableCell>
        <Chip label={translateRole(participant.roles[0])} color={userChipColor(participant)} />
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
