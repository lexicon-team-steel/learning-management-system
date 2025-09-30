import { ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router';
import { Button as MuiButton } from '@mui/material';

interface IButtonProps {
  icon?: boolean;
  text: string;
  link: string;
}

const Button = ({ text, icon = false, link }: IButtonProps): ReactElement => {
  return (
    <MuiButton component={NavLink} to={link} variant="contained" startIcon={icon && <AddIcon />}>
      {text}
    </MuiButton>
  );
};

export default Button;
