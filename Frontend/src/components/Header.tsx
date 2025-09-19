import { ReactElement } from 'react';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { useNavigate } from 'react-router';
import { AppBar, Box, Button, Chip, Container, Toolbar, Typography, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import decodeToken from '../utilities/token/decodeToken';
import { getTokens } from '../utilities/token';

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#ffffff',
}));

const Header = (): ReactElement => {
  const { isLoggedIn, logout } = useAuthContext();
  const token = getTokens();
  const { name, role } = decodeToken(token ? token.accessToken : '');

  const navigate = useNavigate();

  const handleOnLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {isLoggedIn && (
              <>
                <Typography sx={{ paddingRight: 2, color: 'text.primary' }}>{name}</Typography>
                <Chip label={role} sx={{ backgroundColor: '#DBEAFE', color: '#1E40AF', marginRight: 2 }} />
                <Button onClick={handleOnLogout} sx={{ color: 'text.primary' }}>
                  <LogoutIcon sx={{ marginRight: 1 }} /> Logga ut
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
