import { ReactElement } from 'react';

import { useLoaderData } from 'react-router';

import CourseInfo from '../components/CourseInfo';

const CoursePage = (): ReactElement => {
  const { course, participants } = useLoaderData();

  {
    return <CourseInfo course={course} participants={participants} />;
  }
};

export default CoursePage;
