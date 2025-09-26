import { Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface ITimeProps {
  start: string;
  end?: string;
  showIcon?: boolean;
}

const Time = ({ start, end, showIcon = true }: ITimeProps): ReactElement => {
  return (
    <Stack direction="row" spacing={1}>
      {showIcon && <AccessTimeIcon fontSize="small" />}
      <Typography>
        {start}
        {end && ` – ${end}`}
      </Typography>
    </Stack>
  );
};

export default Time;
