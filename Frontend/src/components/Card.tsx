import { ReactElement, ReactNode } from 'react';
import { Card as MUICard, styled, Typography, TypographyVariant } from '@mui/material';

interface ICard {
  title: string;
  titleVariant?: TypographyVariant;
  children: ReactNode;
}

const StyledCard = styled(MUICard)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const Card = ({ title, titleVariant = 'h2', children }: ICard): ReactElement => {
  return (
    <StyledCard>
      <Typography variant={titleVariant} mb={2}>
        {title}
      </Typography>
      {children}
    </StyledCard>
  );
};

export default Card;
