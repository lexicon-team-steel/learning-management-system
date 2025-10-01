import { createContext } from 'react';
import { ICoursesContext } from '../../types';

export const CoursesContext = createContext<ICoursesContext>({} as ICoursesContext);
