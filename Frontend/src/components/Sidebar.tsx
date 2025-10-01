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
import colors from '../styles/colors';
import { adminItems, baseMainItems, NavItem, studentCourseItem } from '../utilities/navigationConstants';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { useCoursesContext } from '../utilities/hooks/useCoursesContext';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';

interface StyledListItemButtonProps {
  active?: boolean;
}

const drawerWidth = 240;

const SidebarBox = styled(Box)(() => ({
  width: drawerWidth,
  flexShrink: 0,
}));

const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: colors.lightBg,
    borderRight: `1px solid ${colors.border}`,
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
}));

const FlexGrowBox = styled(Box)(() => ({
  flexGrow: 1,
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyledListItemButtonProps>(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 1),
  color: colors.textColorDark,
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
  const { isTeacher } = useAuthContext();
  const { courses, loading } = useCoursesContext();

  const mainItems = isTeacher ? baseMainItems : [...baseMainItems, studentCourseItem];

  const renderNavItems = (items: NavItem[]) =>
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
        <List>
          {renderNavItems(mainItems)}
          {isTeacher &&
            !loading &&
            courses.length > 0 &&
            courses.map((c) => (
              <ListItem key={c.id} disablePadding>
                <StyledListItemButton
                  active={location.pathname.startsWith(`/courses/${c.id}`)}
                  onClick={() => navigate(`/courses/${c.id}`)}
                >
                  <ListItemIcon>
                    <ImportContactsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={c.name} />
                </StyledListItemButton>
              </ListItem>
            ))}
        </List>
        <FlexGrowBox />
        {isTeacher && (
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
