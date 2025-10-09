import { IconButton } from '@mui/material';
import { ReactElement } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';

interface IActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}
const ActionButtons = ({ onEdit, onDelete }: IActionButtonsProps): ReactElement => {
  return (
    <>
      <IconButton onClick={onEdit} aria-label="edit">
        <EditIcon fontSize="small" color="primary" />
      </IconButton>
      <IconButton onClick={onDelete} aria-label="delete">
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </>
  );
};

export default ActionButtons;
