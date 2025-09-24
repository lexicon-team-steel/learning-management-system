import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ReactElement } from 'react';

export interface NavItem {
  text: string;
  icon: ReactElement;
  path: string;
}

// FIXME: change routes to correct route
export const mainItems: NavItem[] = [
  { text: 'Dashboard', icon: <HomeOutlinedIcon />, path: '/dashboard' },
  { text: 'Kurser', icon: <ImportContactsOutlinedIcon />, path: '/courses' },
];

export const adminItems: NavItem[] = [
  { text: 'Användare', icon: <PeopleOutlineOutlinedIcon />, path: '/admin/users' },
  { text: 'Kurser', icon: <ImportContactsOutlinedIcon />, path: '/admin/courses' },
  { text: 'Moduler', icon: <EventNoteOutlinedIcon />, path: '/admin/modules' },
  { text: 'Aktiviteter', icon: <SettingsOutlinedIcon />, path: '/admin/activities' },
];
