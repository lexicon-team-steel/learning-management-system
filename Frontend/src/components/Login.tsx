import { FormEventHandler, ReactElement, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { Box, Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Logout';

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
    <form onSubmit={handleOnSubmit}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} maxWidth={450}>
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
        <Button type="submit" variant="contained" startIcon={<LoginIcon />} fullWidth>
          Logga in
        </Button>
      </Box>
    </form>
  );
};

export default Login;
