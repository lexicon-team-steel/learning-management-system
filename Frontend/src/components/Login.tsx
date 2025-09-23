import { FormEventHandler, ReactElement, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { Button, styled, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Logout';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import theme from '../styles/theme';

const StyledForm = styled('form')(() => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  maxWidth: '450px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  padding: theme.spacing(4),
  width: '100%',
  boxShadow: '0 2px 3px 2px #b2b6c2ff',
}));

const StyledIcon = styled(ImportContactsOutlinedIcon)(() => ({
  fontSize: '60px',
}));

const Login = (): ReactElement => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [searchParams] = useSearchParams();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await login(username, password);

    const redirectTo = searchParams.get('redirectTo') || '/';
    navigate(redirectTo, { replace: true });
  };

  return (
    <StyledForm onSubmit={handleOnSubmit}>
      <StyledIcon color="primary" />
      <h1>Steel LMS</h1>
      <TextField
        label="Användarnamn"
        name="username"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Lösenord"
        name="password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
      <Button
        type="submit"
        variant="contained"
        startIcon={<LoginIcon />}
        disabled={username === '' || password === ''}
        fullWidth
      >
        Logga in
      </Button>
    </StyledForm>
  );
};

export default Login;
