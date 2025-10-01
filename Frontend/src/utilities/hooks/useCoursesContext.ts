import { useContext } from 'react';
import { CoursesContext } from '../context/course/coursesContext';

export function useCoursesContext() {
  return useContext(CoursesContext);
}
