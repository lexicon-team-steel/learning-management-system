import { Box, styled, Typography } from '@mui/material';
import { ReactElement } from 'react';
import Heading from './Heading';
import Date from './Date';

interface ICourseBoxProps {
  course: string;
  info: string;
  dateStart: string;
  dateEnd?: string;
}

const InnerBox = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.25),
  padding: theme.spacing(2.5),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 14,
  boxShadow: theme.shadows[0],
  transition: 'box-shadow .2s ease, transform .2s ease',
  '&:hover': {
    boxShadow: theme.shadows[2],
    transform: 'translateY(-1px)',
  },
}));

const StyledTypography = styled(Typography)(() => ({
  overflowWrap: 'anywhere',
}));

const LearningBox = ({ course, info, dateStart }: ICourseBoxProps): ReactElement => {
  return (
    <InnerBox>
      {course && <Heading variant="h3" title={course} />}
      <StyledTypography variant="body1">{info}</StyledTypography>
      {dateStart && <Date start={dateStart} />}
    </InnerBox>
  );
};

export default LearningBox;
