import { ReactElement, Suspense } from 'react';
import { Grid } from '@mui/material';
import EntityCard from './EntityCard';
import CustomCard from './Card';
import { Await } from 'react-router';
import { formatDate } from '../utilities/helpers';
import { ICourse } from '../utilities/types';

interface CourseListBoardProps {
  title?: string;
  courses: Promise<ICourse[]>;
}

const CourseListBoard = ({ title, courses }: CourseListBoardProps): ReactElement => {
  return (
    <CustomCard title={title ? title : undefined}>
      <Grid container spacing={2} columns={3}>
        <Suspense>
          <Await resolve={courses}>
            {(resolvedCourses: ICourse[]) =>
              resolvedCourses.map((course) => (
                <Grid key={course.id} size={1}>
                  <EntityCard
                    title={course.name}
                    text={course.description.substring(0, 50) + '...'} // TODO: do better
                    date={{ start: formatDate(course.startDate) }}
                  />
                </Grid>
              ))
            }
          </Await>
        </Suspense>
      </Grid>
    </CustomCard>
  );
};

export default CourseListBoard;
