import { ReactElement, ReactNode } from 'react';
import { Card, CardContent, CardHeader, styled } from '@mui/material';

interface IRegularCard {
  title: string;
  children: ReactNode;
}

const StyledCardHeader = styled(CardHeader)(() => ({
  padding: '24px',
  '& .MuiCardHeader-title': {
    fontWeight: 500,
    fontSize: '20px',
  },
}));

const StyledCardContent = styled(CardContent)(() => ({
  padding: '24px',
  paddingTop: 0,
}));

const RegularCard = ({ title, children }: IRegularCard): ReactElement => {
  return (
    <Card>
      <StyledCardHeader title={title} />
      <StyledCardContent>{children}</StyledCardContent>
    </Card>
  );
};

export default RegularCard;
