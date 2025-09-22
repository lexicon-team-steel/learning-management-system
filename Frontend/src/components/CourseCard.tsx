import { ReactElement } from 'react';
import { Card, Typography } from '@mui/material';
import styled from '@emotion/styled';

const StyledCard = styled(Card)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'start',
  padding: '1rem',
  width: '20rem',
}));

const StyledTypography = styled(Typography)(({}) => ({}));

const CourseCard = (): ReactElement => {
  return (
    <StyledCard variant="outlined">
      <StyledTypography fontWeight={'bold'}>Kursnamn</StyledTypography>
      <StyledTypography>Beskrivning</StyledTypography>
      <StyledTypography>Datum</StyledTypography>
    </StyledCard>
  );
};

export default CourseCard;
