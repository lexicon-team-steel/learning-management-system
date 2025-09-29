import { Box, styled, Typography } from '@mui/material';
import { IActivity, mockCourse } from '../utilities/data/mockData';
import EntityCard from '../components/EntityCard';
import Card from '../components/Card';
import CollapsibleList from '../components/CollapsibleList';
import ActivityItem from '../components/ActivityItem';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { Await, useLoaderData } from 'react-router';
import { Suspense } from 'react';
import { ICourse } from '../utilities/types';
import { formatDate } from '../utilities/helpers';

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
  const { courses } = useLoaderData();

  const title = isTeacher ? 'Mina kurser' : 'Min kurs';

  return (
    <>
      <Typography variant="h1" sx={{ marginBottom: '1rem' }}>
        Välkommen {user.fullName}!
      </Typography>
      <DashboardGrid>
        <Card title={title}>
          <CardGrid>
            <Suspense>
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
        <Card title="Kommande aktiviteter">
          <CollapsibleList
            items={mockCourse.activities}
            keyField="id"
            renderItem={(item: IActivity) => <ActivityItem activity={item} />}
          />
        </Card>
      </DashboardGrid>
    </>
  );
};

export default DashboardPage;
