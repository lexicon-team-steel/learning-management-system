import { Box, Grid, Stack, styled, Typography } from '@mui/material';
import EntityCard from '../components/EntityCard';
import Card from '../components/Card';
import CollapsibleList from '../components/CollapsibleList';
import ActivityItem from '../components/ActivityItem';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { Await, useLoaderData } from 'react-router';
import { Suspense } from 'react';
import { IActivity, ICourse } from '../utilities/types';
import { formatDate, sortByDate } from '../utilities/helpers';
import theme from '../styles/theme';
import LinkCard from '../components/LinkCard';
import SkeletonTwoCols from '../components/skelotons/SkeletonTwoCols';
import SkeletonOneCol from '../components/skelotons/SkeltonOneCol';

const DashboardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  alignItems: 'start',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '2fr 1fr',
  },
}));

const CardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

const DashboardPage = () => {
  const { user, isTeacher } = useAuthContext();
  const { courses, activities } = useLoaderData();

  const title = isTeacher ? 'Mina kurser' : 'Min kurs';
  const skeleton = isTeacher ? <SkeletonTwoCols /> : <SkeletonOneCol width={300} />;

  return (
    <>
      <Typography variant="h1" sx={{ marginBottom: theme.layout.gap }}>
        Välkommen {user.fullName}!
      </Typography>
      <DashboardGrid>
        <Card title={title}>
          <CardGrid>
            <Suspense fallback={skeleton}>
              <Await resolve={courses}>
                {(courses: ICourse[]) =>
                  courses.map((course) => (
                    <EntityCard
                      key={course.id}
                      title={course.name}
                      text={course.description.substring(0, 50) + '...'} // TODO: do better
                      date={{ start: formatDate(course.startDate) }}
                      link={`/courses/${course.id}`}
                    />
                  ))
                }
              </Await>
            </Suspense>
          </CardGrid>
        </Card>
        <Grid>
          <Stack gap={2}>
            <Suspense fallback={<SkeletonOneCol height={200} />}>
              <Await resolve={activities}>
                {(activities: IActivity[]) => {
                  if (!activities || activities.length === 0) {
                    return <Card title="Kommande aktiviteter">Inga kommande aktiviteter</Card>;
                  }

                  const sortedActivities = sortByDate(activities, 'endDate');
                  return (
                    <Card title="Kommande aktiviteter">
                      <CollapsibleList
                        items={sortedActivities}
                        keyField="id"
                        renderItem={(activity: IActivity) => <ActivityItem activity={activity} />}
                      />
                    </Card>
                  );
                }}
              </Await>
            </Suspense>
            {isTeacher && (
              <LinkCard
                title="Snabblänkar"
                buttons={[
                  { text: 'Hantera användare', link: '/admin/users' },
                  { text: 'Hantera kurser', link: '/admin/courses' },
                ]}
              />
            )}
          </Stack>
        </Grid>
      </DashboardGrid>
    </>
  );
};

export default DashboardPage;
