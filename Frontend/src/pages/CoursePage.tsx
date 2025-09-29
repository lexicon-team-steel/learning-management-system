import { ReactElement, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { ICourse, IModule, IParticipant } from '../utilities/types';
import { Box, Card, Grid, Typography } from '@mui/material';
import CustomCard from '../components/Card';
import CollapsibleList from '../components/CollapsibleList';
import EntityCard from '../components/EntityCard';
import ParticipantItem from '../components/ParticipantItem';
import { formatDate } from '../utilities/helpers';

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
              <Await resolve={course}>
                {(resolvedCourse: ICourse) => {
                  if (!resolvedCourse.modules) {
                    return <Typography>Denna kurs har ännu inga moduler.</Typography>;
                  }

                  return resolvedCourse.modules.map((module: IModule) => (
                    <EntityCard
                      key={module.id}
                      title={module.name}
                      text={module.description}
                      date={{
                        start: formatDate(module.startDate),
                        end: formatDate(module.endDate),
                      }}
                      link="/module"
                    />
                  ));
                }}
              </Await>
            </Suspense>
          </Box>
        </CustomCard>
      </Grid>
      <Grid size={4}>
        <CustomCard title="Kursdeltagare">
          <Suspense>
            <Await resolve={participants}>
              {(resolvedParticipants: IParticipant[]) => (
                <CollapsibleList
                  items={resolvedParticipants}
                  keyField="email"
                  renderItem={(item: IParticipant) => <ParticipantItem participant={item} />}
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
