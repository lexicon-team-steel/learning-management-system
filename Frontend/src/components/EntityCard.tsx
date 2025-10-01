import { Card, Stack, styled, Typography } from '@mui/material';
import { ReactElement } from 'react';
import Date from './Date';
import Time from './Time';
import { NavLink } from 'react-router';

interface IEntityCardProps {
  title: string;
  text: string;
  link?: string;
  date: { start: string; end?: string };
  time?: { start: string; end?: string };
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto auto 1fr',
  gap: theme.spacing(1.25),
  padding: theme.spacing(2.5),
  height: '100%',
}));

const StyledLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  borderRadius: theme.shape.borderRadius,
  transition: 'box-shadow .2s ease, transform .2s ease',
  '&:hover': {
    boxShadow: theme.shadows[2],
    transform: 'translateY(-1px)',
  },
}));

const StyledTypography = styled(Typography)(() => ({
  overflowWrap: 'anywhere',
}));

const EntityCard = ({ title, text, link, date, time }: IEntityCardProps): ReactElement => {
  const Card = (
    <StyledCard variant="outlined">
      <Typography variant="h3">{title}</Typography>
      <StyledTypography variant="body1">{text}</StyledTypography>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" maxWidth="sm" alignSelf="end">
        <Date start={date.start} end={date.end && date.end} />
        {time && <Time start={time.start} end={time.end && time.end} />}
      </Stack>
    </StyledCard>
  );

  return link ? <StyledLink to={link}>{Card}</StyledLink> : Card;
};

export default EntityCard;
