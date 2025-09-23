import { ReactElement } from 'react';

import { useLoaderData } from 'react-router';

import CourseInfo from '../components/CourseInfo';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import CoursesBoard from '../components/CoursesBoard';


const CoursePage = (): ReactElement => {
  const { course } = useLoaderData();
  const { isTeacher } = useAuthContext();

  {return isTeacher? <CoursesBoard/> : <CourseInfo course={course} />}
  
};

export default CoursePage;
