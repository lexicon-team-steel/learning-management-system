// navigationConstants.ts
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { ReactElement } from 'react';

export interface NavItem {
  text: string;
  icon: ReactElement;
  path: string;
}

export const baseMainItems: NavItem[] = [{ text: 'Dashboard', icon: <HomeOutlinedIcon />, path: '/dashboard' }];

export const studentCourseItem: NavItem = {
  text: 'Kurs',
  icon: <ImportContactsOutlinedIcon />,
  path: '/course',
};

export const adminItems: NavItem[] = [
  { text: 'Användare', icon: <PeopleOutlineOutlinedIcon />, path: '/admin/users' },
  { text: 'Kurser', icon: <ImportContactsOutlinedIcon />, path: '/admin/courses' },
];
