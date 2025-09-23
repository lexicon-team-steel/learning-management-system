import { ReactElement, Suspense } from 'react';
import { Await } from 'react-router';
import { ICourse } from '../utilities/types';
import { Grid, Paper, Typography } from '@mui/material';
import BasicCard from '../components/BasicCard';
import CollapsibleList from '../components/CollapsibleList';
import { participants } from '../utilities/data';
import { Participant } from '../features/course-participants/types';
import ParticipantItem from '../features/course-participants/components/ParticipantItem';
import EntityCard from '../components/EntityCard';
import { mockCourse } from '../utilities/data/mockData';

interface CourseInfoProps {
  course: Promise<ICourse>;
}

const CourseInfo = ({ course }: CourseInfoProps): ReactElement => {
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
            <Await resolve="replace this with participants object/array like above which we probably get from loader in future">
              <CollapsibleList
                items={participants}
                keyField="email"
                renderItem={(item: Participant) => <ParticipantItem participant={item} />}
              />
            </Await>
          </Suspense>
        </BasicCard>
      </Grid>
    </Grid>
  );
};

export default CourseInfo;
