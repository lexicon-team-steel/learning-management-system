import { Card, Link, styled, Typography } from '@mui/material';
import { ReactElement } from 'react';
import Date from './Date';

interface ICourseBoxProps {
  title: string;
  text: string;
  link: string;
  date: { start: string; end?: string };
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

const LearningBox = ({ title, text, link, date }: ICourseBoxProps): ReactElement => {
  return (
    <Link href={link} underline="none">
      <StyledCard variant="outlined">
        <Typography variant="h3">{title}</Typography>
        <StyledTypography variant="body1">{text}</StyledTypography>
        <Date start={date.start} end={date.end && date.end} />
      </StyledCard>
    </Link>
  );
};

export default LearningBox;
