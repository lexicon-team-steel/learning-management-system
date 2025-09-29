import { ReactElement, Suspense } from 'react';
import { Grid } from '@mui/material';
import EntityCard from './EntityCard';
import { ICourse } from '../utilities/data/mockData';
import CustomCard from './Card';
import { Await, useLoaderData } from 'react-router';

interface CourseListBoardProps {
  courses: Promise<ICourse[]>;
}

const CourseListBoard = ({ courses }: CourseListBoardProps): ReactElement => {
  return (
    <CustomCard title="Alla kurser">
      <Grid container spacing={2} columns={3}>
        <Suspense>
          <Await resolve={courses}>
            {(courses: ICourse[]) =>
              courses.map((course) => (
                <Grid key={course.id} size={1}>
                  <EntityCard
                    title={course.name}
                    text={course.description.substring(0, 50) + '...'} // TODO: do better
                    date={{ start: course.dateStart }}
                    link={`/courses/${course.id}`}
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
