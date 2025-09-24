import { ReactElement, ReactNode } from 'react';
import { Card, CardContent, CardHeader, styled } from '@mui/material';

interface IBasicCard {
  title: string;
  children: ReactNode;
}

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },

  '& .MuiCardHeader-title': {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(0),

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(0),
  },
}));

const BasicCard = ({ title, children }: IBasicCard): ReactElement => {
  return (
    <Card>
      <StyledCardHeader title={title} />
      <StyledCardContent>{children}</StyledCardContent>
    </Card>
  );
};

export default BasicCard;
