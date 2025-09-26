import { Card, Link, Stack, styled, Typography } from '@mui/material';
import { ReactElement } from 'react';
import Date from './Date';
import Time from './Time';

interface IEntityCardProps {
  title: string;
  text: string;
  link?: string;
  date?: { start: string; end?: string };
  time?: { start: string; end?: string };
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.25),
  padding: theme.spacing(2.5),
}));

const StyledStack = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

const StyledLink = styled(Link)(({ theme }) => ({
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
      <StyledStack maxWidth="sm">
        {date && <Date start={date.start} end={date.end && date.end} />}
        {time && <Time start={time.start} end={time.end && time.end} />}
      </StyledStack>
    </StyledCard>
  );

  if (!link) {
    return Card;
  }

  return (
    <StyledLink href={link} underline="none">
      {Card}
    </StyledLink>
  );
};

export default EntityCard;
