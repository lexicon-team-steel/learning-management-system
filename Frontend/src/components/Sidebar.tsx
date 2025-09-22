import { ReactElement } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SettingsIcon from '@mui/icons-material/Settings';
import colors from '../styles/colors';
import decodeToken from '../utilities/token/decodeToken';
import { getTokens } from '../utilities/token';

const drawerWidth = 240;

const SidebarBox = styled(Box)(() => ({
  width: drawerWidth,
  flexShrink: 0,
}));

const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: colors.lightBg,
    borderRight: `1px solid ${colors.borderLight}`,
  },
}));

const Title = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  padding: '16px',
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: '4px 8px',
  ...(active && {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  }),
}));

const Sidebar = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getTokens();
  const { role } = decodeToken(token ? token.accessToken : '');

  const mainItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
    { text: 'Kurser', icon: <MenuBookIcon />, path: '/courses' },
  ];

  const adminItems = [
    { text: 'Användare', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Kurser', icon: <MenuBookIcon />, path: '/admin/courses' },
    { text: 'Moduler', icon: <EventNoteIcon />, path: '/admin/modules' },
    { text: 'Aktiviteter', icon: <SettingsIcon />, path: '/admin/activities' },
  ];

  const renderNavItems = (items: { text: string; icon: ReactElement; path: string }[]) =>
    items.map(({ text, icon, path }) => (
      <ListItem key={text} disablePadding>
        <StyledListItemButton active={location.pathname.startsWith(path)} onClick={() => navigate(path)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </StyledListItemButton>
      </ListItem>
    ));

  return (
    <SidebarBox>
      <StyledDrawer variant="permanent" anchor="left">
        <Title>LMS System</Title>
        <List>{renderNavItems(mainItems)}</List>
        {role === 'teacher' && (
          <>
            <Divider />
            <Typography variant="caption" sx={{ pl: 2, pb: 1, color: 'text.secondary' }}>
              Administration
            </Typography>
            <List>{renderNavItems(adminItems)}</List>
          </>
        )}
      </StyledDrawer>
    </SidebarBox>
  );
};

export default Sidebar;
