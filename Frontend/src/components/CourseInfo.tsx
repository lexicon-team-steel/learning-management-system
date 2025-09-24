import { ReactElement, Suspense } from 'react';
import { Await } from 'react-router';
import { ICourse, IStudent } from '../utilities/types';
import { Grid, Paper, Typography } from '@mui/material';
import BasicCard from '../components/BasicCard';
import CollapsibleList from '../components/CollapsibleList';
import EntityCard from '../components/EntityCard';
import { mockCourse } from '../utilities/data/mockData';
import ParticipantItem from './ParticipantItem';

interface CourseInfoProps {
  course: Promise<ICourse>;
  participants: Promise<IStudent[]>;
}

const CourseInfo = ({ course, participants }: CourseInfoProps): ReactElement => {
  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Paper sx={{ p: 4 }}>
          <Suspense>
            <Await resolve={course}>
              {(course: ICourse) => (
                <>
                  <Typography variant="h1" sx={{ marginBottom: '1rem' }}>
                    {course.name}!
                  </Typography>
                  <Typography>{course.description}</Typography>
                </>
              )}
            </Await>
          </Suspense>
        </Paper>
      </Grid>
      <Grid size={8}>
        <BasicCard title="Moduler" gap={2}>
          <Suspense>
            <Await resolve="replace this with participants object/array like above which we probably get from loader in future">
              {mockCourse.modules.map((module) => (
                <EntityCard
                  title={module.name}
                  text={module.description}
                  date={{
                    start: new Intl.DateTimeFormat('sv-SE').format(module.dateStart),
                    end: new Intl.DateTimeFormat('sv-SE').format(module.dateEnd),
                  }}
                  link="/module"
                />
              ))}
            </Await>
          </Suspense>
        </BasicCard>
      </Grid>
      <Grid size={4}>
        <BasicCard title="Kursdeltagare">
          <Suspense>
            <Await resolve={participants}>
              {(resolvedParticipants: IStudent[]) => (
                <CollapsibleList
                  items={resolvedParticipants}
                  keyField="email"
                  renderItem={(item: IStudent) => <ParticipantItem participant={item} />}
                />
              )}
            </Await>
          </Suspense>
        </BasicCard>
      </Grid>
    </Grid>
  );
};

export default CourseInfo;
