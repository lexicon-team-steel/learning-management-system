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
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
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
    backgroundColor: colors.lightBg,
    borderRight: `1px solid ${colors.borderLight}`,
  },
}));

const Title = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '1.2rem',
  padding: '1.2rem',
}));

const AdminTitle = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: 'text.secondary',
}));

const FlexGrowBox = styled(Box)(() => ({
  flexGrow: 1,
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: '4px 8px',
  color: theme.palette.text.primary,
  ...(active && {
    backgroundColor: colors.chipBgColor,
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  }),
  '& .MuiListItemIcon-root': {
    minWidth: 32,
    color: 'inherit',
    marginBottom: '2px',
  },
}));

const Sidebar = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getTokens();
  const { role } = decodeToken(token ? token.accessToken : '');

  const mainItems = [
    { text: 'Dashboard', icon: <HomeOutlinedIcon />, path: '/' },
    { text: 'Kurser', icon: <ImportContactsOutlinedIcon />, path: '/courses' },
  ];

  const adminItems = [
    { text: 'Användare', icon: <PeopleOutlineOutlinedIcon />, path: '/admin/users' },
    { text: 'Kurser', icon: <ImportContactsOutlinedIcon />, path: '/admin/courses' },
    { text: 'Moduler', icon: <EventNoteOutlinedIcon />, path: '/admin/modules' },
    { text: 'Aktiviteter', icon: <SettingsOutlinedIcon />, path: '/admin/activities' },
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
        <FlexGrowBox />
        {role === 'Teacher' && (
          <Box>
            <AdminTitle variant="caption">Administration</AdminTitle>
            <List>{renderNavItems(adminItems)}</List>
          </Box>
        )}
      </StyledDrawer>
    </SidebarBox>
  );
};

export default Sidebar;
