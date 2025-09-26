import { Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface ITimeProps {
  start: string;
  end: string;
}

const Time = ({ start, end }: ITimeProps): ReactElement => {
  return (
    <Stack direction="row" spacing={1}>
      <AccessTimeIcon fontSize="small" />
      <Typography>
        {start}
        {end && ` – ${end}`}
      </Typography>
    </Stack>
  );
};

export default Time;
