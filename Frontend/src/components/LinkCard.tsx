import Card from './Card';
import Button from './Button';
import { Stack } from '@mui/material';
import { IButtonConfig } from '../utilities/types';

interface ILinkCardProps {
  title: string;
  buttons: IButtonConfig[];
}

const LinkCard = ({ title, buttons }: ILinkCardProps) => {
  return (
    <Card title={title}>
      <Stack spacing={1}>
        {buttons.map((btn) => (
          <Button key={btn.text} text={btn.text} link={btn.link} />
        ))}
      </Stack>
    </Card>
  );
};

export default LinkCard;
