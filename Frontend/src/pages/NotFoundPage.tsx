import { Button, Stack } from '@mui/material';
import { NavLink } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from '../styles/theme';

const NotFoundPage = () => {
  return (
    <Stack spacing={theme.layout.gap} alignItems="start">
      <h1>Sidan hittas inte!</h1>
      <p>Sidan du försöker navigera till finns inte.</p>
      <Button component={NavLink} to="/dashboard" startIcon={<ArrowBackIcon />}>
        Gå till Dashboard
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
