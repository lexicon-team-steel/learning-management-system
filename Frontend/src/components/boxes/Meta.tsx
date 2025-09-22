import { Stack, styled, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { ReactElement } from 'react';

interface IMetaProps {
  start?: string;
  dateEnd?: string;
}

const DateRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const CalendarIcon = styled(CalendarMonthIcon)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
}));

const StyledTypography = styled(Typography)(() => ({
  overflowWrap: 'anywhere',
}));

const Meta = ({ start, dateEnd }: IMetaProps): ReactElement => {
  return (
    <DateRow>
      <CalendarIcon />
      <StyledTypography variant="body2">
        {start}
        {dateEnd ? ` – ${dateEnd}` : ''}
      </StyledTypography>
    </DateRow>
  );
};

export default Meta;
