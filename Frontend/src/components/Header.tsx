import { ReactElement } from 'react';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { useNavigate } from 'react-router';
import { AppBar, Box, Button, Chip, Container, Toolbar, Typography, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import decodeToken from '../utilities/token/decodeToken';
import { getTokens } from '../utilities/token';

const HeaderBox = styled(Box)(() => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const StyledButton = styled(Button)(() => ({
  color: '#374152',
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeaderBox>
            {isLoggedIn && (
              <>
                <StyledTypography>{name}</StyledTypography>
                <StyledChip label={role} />
                <StyledButton onClick={handleOnLogout} startIcon={<LogoutIcon />}>
                  Logga ut
                </StyledButton>
              </>
            )}
          </HeaderBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
