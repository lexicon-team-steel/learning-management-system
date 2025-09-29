import { ReactElement } from 'react';

import { Button as MuiButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
interface IButtonProps {
  icon?: boolean;
  text: string;
  onClick: () => void;
}

const Button = ({ text, icon = false, onClick }: IButtonProps): ReactElement => {
  return (
    <MuiButton variant="contained" onClick={onClick} startIcon={icon && <AddIcon />}>
      {text}
    </MuiButton>
  );
};

export default Button;
