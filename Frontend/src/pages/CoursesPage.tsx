import { ReactElement } from 'react';

import CourseListBoard from '../components/CourseListBoard';
import { useLoaderData } from 'react-router';

const CoursesPage = (): ReactElement => {
  const { courses } = useLoaderData();

  return (
    <>
      <p>Place for dashbord link</p>
      <CourseListBoard courses={courses} />
    </>
  );
};

export default CoursesPage;
