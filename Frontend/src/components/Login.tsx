import { FormEventHandler, ReactElement, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { Alert, Button, Card, styled, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Logout';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import theme from '../styles/theme';

const StyledCard = styled(Card)(() => ({
  maxWidth: '450px',
  padding: theme.spacing(4),
  width: '100%',
}));

const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const StyledIcon = styled(ImportContactsOutlinedIcon)(() => ({
  fontSize: '60px',
}));

const Login = (): ReactElement => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await login(username, password);

    if (!result.success && result.message) {
      setError(result.message);
      return;
    }

    const redirectTo = searchParams.get('redirectTo') || '/dashboard';
    navigate(redirectTo, { replace: true });
  };

  return (
    <StyledCard>
      <StyledForm onSubmit={handleOnSubmit}>
        <StyledIcon color="primary" />
        <Typography variant="h1">Steel LMS</Typography>
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
        {error && <Alert severity="error">{error}</Alert>}
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
    </StyledCard>
  );
};

export default Login;
