import { Container, styled, Typography, TypographyProps } from '@mui/material';
import { ReactElement } from 'react';
import { HeadingLevel } from '../utilities/types';

interface IHeadingProps {
  variant: HeadingLevel;
  title: string;
}

const StyledTypography = styled(Typography)<TypographyProps>(() => ({
  textTransform: 'capitalize',
}));

const Heading = ({ variant, title }: IHeadingProps): ReactElement => {
  return (
    <Container component="section" disableGutters>
      <StyledTypography variant={variant}>{title}</StyledTypography>
    </Container>
  );
};

export default Heading;
