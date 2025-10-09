import { ReactElement, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { ICourse, IModule, IParticipant } from '../utilities/types';
import { Box, Grid, Typography } from '@mui/material';
import CollapsibleList from '../components/CollapsibleList';
import EntityCard from '../components/EntityCard';
import ParticipantItem from '../components/ParticipantItem';
import { formatDate, sortByDate } from '../utilities/helpers';
import Card from '../components/Card';
import theme from '../styles/theme';
import LinkCard from '../components/LinkCard';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import SkeletonList from '../components/skelotons/SkeletonList';
import SkeletonOneCol from '../components/skelotons/SkeltonOneCol';

const CoursePage = (): ReactElement => {
  const { course, participants } = useLoaderData();
  const { isTeacher } = useAuthContext();
  const teacherDefaultParticipants = 2;

  return (
    <Grid container spacing={theme.layout.gapLarge}>
      <Grid size={12}>
        <Suspense fallback={<SkeletonOneCol />}>
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
          <Box display="flex" flexDirection="column" gap={theme.layout.gap}>
            <Suspense fallback={<SkeletonList />}>
              <Await resolve={course}>
                {(resolvedCourse: ICourse) => {
                  if (!resolvedCourse.modules) {
                    return <Typography>Denna kurs har ännu inga moduler.</Typography>;
                  }
                  const sortedModules = sortByDate(resolvedCourse.modules, 'startDate');
                  return sortedModules.map((module: IModule) => (
                    <EntityCard
                      key={module.id}
                      title={module.name}
                      text={module.description}
                      date={{
                        start: formatDate(module.startDate),
                        end: formatDate(module.endDate),
                      }}
                      link={`/courses/${resolvedCourse.id}/modules/${module.id}`}
                    />
                  ));
                }}
              </Await>
            </Suspense>
          </Box>
        </Card>
      </Grid>
      <Grid size={4} spacing={theme.layout.gapLarge}>
        <Box display={'flex'} flexDirection={'column'} gap={theme.layout.gapLarge}>
          <Card title="Kursdeltagare">
            <Suspense fallback={<SkeletonOneCol height={200} />}>
              <Await resolve={participants}>
                {(resolvedParticipants: IParticipant[]) => (
                  <CollapsibleList
                    itemsDefault={isTeacher ? teacherDefaultParticipants : undefined}
                    items={resolvedParticipants}
                    keyField="email"
                    renderItem={(item: IParticipant) => <ParticipantItem participant={item} />}
                  />
                )}
              </Await>
            </Suspense>
          </Card>
          {isTeacher && (
            <Suspense fallback={<SkeletonOneCol height={200} />}>
              <Await resolve={course}>
                {(course: ICourse) => (
                  <LinkCard
                    title="Kursadministration"
                    buttons={[
                      { text: 'Hantera kurser', link: '/admin/courses' },
                      { text: 'Hantera moduler', link: `/admin/courses/${course.id}/modules` },
                    ]}
                  />
                )}
              </Await>
            </Suspense>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CoursePage;
