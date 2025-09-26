import { ReactElement, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { ICourse, IStudent } from '../utilities/types';
import { Box, Card, Grid, Typography } from '@mui/material';
import CustomCard from '../components/Card';
import CollapsibleList from '../components/CollapsibleList';
import EntityCard from '../components/EntityCard';
import { mockCourse } from '../utilities/data/mockData';
import ParticipantItem from '../components/ParticipantItem';

const CoursePage = (): ReactElement => {
  const { course, participants } = useLoaderData();

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Card sx={{ p: 4 }}>
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
        </Card>
      </Grid>
      <Grid size={8}>
        <CustomCard title="Moduler">
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Suspense>
              <Await resolve="replace this with participants object/array like above which we probably get from loader in future">
                {mockCourse.modules.map((module) => (
                  <EntityCard
                    key={module.id}
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
          </Box>
        </CustomCard>
      </Grid>
      <Grid size={4}>
        <CustomCard title="Kursdeltagare">
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
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default CoursePage;
