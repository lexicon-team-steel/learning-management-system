import { Container, ContainerProps, styled } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface IMainBoxProps {
  children: ReactNode;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 16,
  boxShadow: theme.shadows[1],
}));

const LmsBox = ({ children, size }: IMainBoxProps): ReactElement => {
  return (
    <StyledContainer component="article" maxWidth={size}>
      {children}
    </StyledContainer>
  );
};

export default LmsBox;
