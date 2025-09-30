import Card from './Card';

import { Stack, Button } from '@mui/material';
import { IButtonConfig } from '../utilities/types';
import { NavLink } from 'react-router';

interface ILinkCardProps {
  title: string;
  buttons: IButtonConfig[];
}

const LinkCard = ({ title, buttons }: ILinkCardProps) => {
  return (
    <Card title={title}>
      <Stack spacing={1}>
        {buttons.map((btn) => (
          <Button key={btn.text} component={NavLink} to={btn.link} variant="contained">
            {btn.text}
          </Button>
        ))}
      </Stack>
    </Card>
  );
};

export default LinkCard;
