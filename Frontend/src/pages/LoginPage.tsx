import Login from '../components/Login';
import { Container, ContainerProps, styled } from '@mui/material';

const Main = styled(Container)<ContainerProps>(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
}));

const LoginPage = () => {
  return (
    <Main component="main">
      <Login />
    </Main>
  );
};

export default LoginPage;
