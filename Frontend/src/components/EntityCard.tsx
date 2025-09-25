import { Card, Link, styled, Typography } from '@mui/material';
import { ReactElement } from 'react';
import DateAndTime from './DateAndTime';
import { ActivityType } from '../utilities/data/mockData';

interface IEntityCardProps {
  title: string;
  text: string;
  link: string;
  type?: ActivityType;
  date?: { start: string; end?: string };
  time?: { start: string; end: string };
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.25),
  padding: theme.spacing(2.5),
  transition: 'box-shadow .2s ease, transform .2s ease',
  '&:hover': {
    boxShadow: theme.shadows[2],
    transform: 'translateY(-1px)',
  },
}));

const StyledTypography = styled(Typography)(() => ({
  overflowWrap: 'anywhere',
}));

const EntityCard = ({ title, text, link, date, time, type }: IEntityCardProps): ReactElement => {
  return (
    <Link href={link} underline="none">
      <StyledCard variant="outlined">
        {type && title && (
          <Typography variant="h3">
            {type}: {title}
          </Typography>
        )}
        <StyledTypography variant="body1">{text}</StyledTypography>
        <DateAndTime date={date} time={time} />
      </StyledCard>
    </Link>
  );
};

export default EntityCard;
