import { styled, Container, ContainerProps } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface IMainProps {
  children: ReactNode;
}

const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  padding: theme.layout.pageMargin,
}));

const Main = ({ children }: IMainProps): ReactElement => {
  return <StyledContainer component="main">{children}</StyledContainer>;
};

export default Main;
