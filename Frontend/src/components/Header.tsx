import { ReactElement } from 'react';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { useNavigate } from 'react-router';
import { AppBar, Box, Button, Chip, Container, Toolbar, Typography, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import colors from '../styles/colors';

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
  color: colors.textColorDark,
}));

const Header = (): ReactElement => {
  const { logout, user } = useAuthContext();
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
            <StyledTypography>{user.fullName}</StyledTypography>
            <StyledChip label={user.role} />
            <StyledButton onClick={handleOnLogout} startIcon={<LogoutIcon />}>
              Logga ut
            </StyledButton>
          </HeaderBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
