import { Stack, Typography } from '@mui/material';
import { ReactElement, ElementType } from 'react';

interface IDateAndTimeProps {
  icon?: ElementType;
  date?: { start?: string; end?: string };
  time?: { start?: string; end?: string };
}

const DateAndTime = ({ icon: Icon, date, time }: IDateAndTimeProps): ReactElement => {
  const { start: dateStart, end: dateEnd } = date || {};
  const { start: startTime, end: endTime } = time || {};

  // Show date range if available, otherwise fall back to time range
  const range = (start?: string, end?: string) => (start && end ? `${start} – ${end}` : (start ?? end ?? ''));
  const hasAnyDate = !!(dateStart || dateEnd);
  const displayDateOrTime = hasAnyDate ? range(dateStart, dateEnd) : range(startTime, endTime);

  return (
    <Stack direction="row" spacing={1}>
      {Icon && <Icon fontSize="small" />}
      <Typography>{displayDateOrTime}</Typography>
    </Stack>
  );
};

export default DateAndTime;
