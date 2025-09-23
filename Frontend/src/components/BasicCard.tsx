import { ReactElement, ReactNode } from 'react';
import { Card, CardContent, CardHeader, styled, Box } from '@mui/material';

interface IBasicCard {
  title: string;
  children: ReactNode;
  gap?: number; // nytt props
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

const BasicCard = ({ title, children, gap = 0 }: IBasicCard): ReactElement => {
  return (
    <Card>
      <StyledCardHeader title={title} />
      <StyledCardContent>
        <Box display="flex" flexDirection="column" gap={gap}>
          {children}
        </Box>
      </StyledCardContent>
    </Card>
  );
};

export default BasicCard;
