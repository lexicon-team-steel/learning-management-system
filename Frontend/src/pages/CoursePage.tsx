import { ReactElement } from 'react';

import { useLoaderData } from 'react-router';

import CourseInfo from '../components/CourseInfo';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import CoursesBoard from '../components/CoursesBoard';

const CoursePage = (): ReactElement => {
  const { course, participants } = useLoaderData();
  const { isTeacher } = useAuthContext();

  {
    return isTeacher ? <CoursesBoard /> : <CourseInfo course={course} participants={participants} />;
  }
};

export default CoursePage;
