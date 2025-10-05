import { useContext } from 'react';
import { CoursesContext } from '../context/course/CoursesContext';

export function useCoursesContext() {
  return useContext(CoursesContext);
}
