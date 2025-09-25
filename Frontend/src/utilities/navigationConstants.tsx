// navigationConstants.ts
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

export const baseMainItems: NavItem[] = [
  { text: 'Dashboard', icon: <HomeOutlinedIcon />, path: '/dashboard' },
  // Kurs/kuser löses i Sidebar beroende på isTeacher
];

export const teacherCourseItem: NavItem = {
  text: 'Kurser',
  icon: <ImportContactsOutlinedIcon />,
  path: '/courses',
};

export const studentCourseItem: NavItem = {
  text: 'Kurs',
  icon: <ImportContactsOutlinedIcon />,
  path: '/course',
};

export const adminItems: NavItem[] = [
  { text: 'Användare', icon: <PeopleOutlineOutlinedIcon />, path: '/admin/users' },
  { text: 'Kurser', icon: <ImportContactsOutlinedIcon />, path: '/admin/courses' },
  { text: 'Moduler', icon: <EventNoteOutlinedIcon />, path: '/admin/modules' },
  { text: 'Aktiviteter', icon: <SettingsOutlinedIcon />, path: '/admin/activities' },
];
