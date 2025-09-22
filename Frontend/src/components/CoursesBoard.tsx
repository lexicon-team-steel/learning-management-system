import { ReactElement } from 'react';
import { Paper, Typography, styled } from '@mui/material';
import CourseCard from './CourseCard';

const StyledPaper = styled(Paper)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '2rem',
}));

const StyledDiv = styled('div')(({}) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
}));

const StyledTypography = styled(Typography)(({}) => ({}));

const CoursesBoard = (): ReactElement => {
  return (
    <StyledPaper elevation={3}>
      <StyledTypography variant="h6">Mina Kurser</StyledTypography>
      <StyledDiv>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </StyledDiv>
    </StyledPaper>
  );
};

export default CoursesBoard;
