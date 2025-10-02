import { Button, Stack } from '@mui/material';
import { NavLink } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from '../styles/theme';

const NotAuthorizedPage = () => {
  return (
    <Stack spacing={theme.layout.gap} alignItems="start">
      <h1>Otillåten sida!</h1>
      <p>Behörighet saknas för sidan som försökte nås.</p>
      <Button component={NavLink} to="/dashboard" startIcon={<ArrowBackIcon />}>
        Gå tillbaka till Dashboard
      </Button>
    </Stack>
  );
};

export default NotAuthorizedPage;
