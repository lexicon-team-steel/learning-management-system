import { Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ReactElement } from 'react';

interface IDateProps {
  start: string;
  end?: string;
}

const Date = ({ start, end }: IDateProps): ReactElement => {
  return (
    <Stack direction="row" spacing={1}>
      <CalendarMonthIcon fontSize="small" />
      <Typography>
        {start}
        {end && ` – ${end}`}
      </Typography>
    </Stack>
  );
};

export default Date;
