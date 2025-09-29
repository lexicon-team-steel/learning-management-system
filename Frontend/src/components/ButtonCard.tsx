import Card from './Card';
import Button from './Button';
import { Stack } from '@mui/material';

interface IButtonConfig {
  text: string;
  onClick: () => void;
}

interface IButtonCardProps {
  buttons: IButtonConfig[];
}

const ButtonCard = ({ buttons }: IButtonCardProps) => {
  return (
    <Card title="Snabblänkar">
      <Stack spacing={1}>
        {buttons.map((btn) => (
          <Button key={btn.text} text={btn.text} onClick={btn.onClick} />
        ))}
      </Stack>
    </Card>
  );
};

export default ButtonCard;
