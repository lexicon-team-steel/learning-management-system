import { Stack, Typography, styled } from '@mui/material';
import { ReactElement, ElementType } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface IDateAndTimeProps {
  icons?: {
    calendar?: ElementType;
    time?: ElementType;
  };
  date?: { start: string; end?: string };
  time?: { start: string; end: string };
}

const StyledStack = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '600px',
  width: '100%',
}));

const DateAndTime = ({ icons, date, time }: IDateAndTimeProps): ReactElement => {
  const DateIcon = icons?.calendar ?? CalendarMonthIcon;
  const TimeIcon = icons?.time ?? AccessTimeIcon;

  const { start: dateStart, end: dateEnd } = date || {};
  const { start: startTime, end: endTime } = time || {};

  const range = (start?: string, end?: string) => (start && end ? `${start} – ${end}` : (start ?? end ?? ''));
  const hasAnyDate = !!(dateStart || dateEnd);
  const hasAnyTime = !!(startTime || endTime);
  const showDate = hasAnyDate && range(dateStart, dateEnd);
  const showTime = hasAnyTime && range(startTime, endTime);

  const renderDate = () => {
    return (
      showDate && (
        <Stack direction="row" spacing={1} alignItems="center">
          <DateIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {showDate}
          </Typography>
        </Stack>
      )
    );
  };

  const rederTime = () => {
    return (
      showTime && (
        <Stack direction="row" spacing={1} alignItems="center">
          <TimeIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {showTime}
          </Typography>
        </Stack>
      )
    );
  };

  return (
    <Stack direction="row" spacing={1}>
      <StyledStack>
        {renderDate()}
        {rederTime()}
      </StyledStack>
    </Stack>
  );
};

export default DateAndTime;
