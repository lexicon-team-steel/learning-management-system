import { ReactElement, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { ICourse, IModule, IParticipant } from '../utilities/types';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import CollapsibleList from '../components/CollapsibleList';
import EntityCard from '../components/EntityCard';
import ParticipantItem from '../components/ParticipantItem';
import { formatDate } from '../utilities/helpers';
import Card from '../components/Card';
import theme from '../styles/theme';

const CoursePage = (): ReactElement => {
  const { course, participants } = useLoaderData();

  return (
    <Grid container spacing={theme.layout.gapLarge}>
      <Grid size={12}>
        <Suspense fallback={<Skeleton variant="rounded" height={150} />}>
          <Await resolve={course}>
            {(course: ICourse) => (
              <Card title={course.name} titleVariant="h1">
                <Typography>{course.description}</Typography>
              </Card>
            )}
          </Await>
        </Suspense>
      </Grid>
      <Grid size={8}>
        <Card title="Moduler">
          <Box display={'flex'} flexDirection={'column'} gap={theme.layout.gap}>
            <Suspense fallback={<Skeleton variant="rounded" height={150} />}>
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
        </Card>
      </Grid>
      <Grid size={4}>
        <Card title="Kursdeltagare">
          <Suspense fallback={<Skeleton variant="rounded" height={150} />}>
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
        </Card>
      </Grid>
    </Grid>
  );
};

export default CoursePage;
