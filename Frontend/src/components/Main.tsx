import { styled } from '@mui/material';
import Container from '@mui/material/Container';
import { ReactElement, ReactNode } from 'react';

interface IMainProps {
  children: ReactNode;
}

const StyledContainer = styled(Container)(() => ({
  padding: '1.5rem',
}));

const Main = ({ children }: IMainProps): ReactElement => {
  return (
    <StyledContainer>
      <Container component="main">{children}</Container>
    </StyledContainer>
  );
};

export default Main;
