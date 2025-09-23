import { ReactElement, ReactNode } from 'react';
import { Card as MUICard, styled } from '@mui/material';

interface ICard {
  children: ReactNode;
}

const StyledCard = styled(MUICard)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const Card = ({ children }: ICard): ReactElement => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
