import { Box, styled, Typography } from '@mui/material';
import { IActivity, mockCourse } from '../utilities/data/mockData';
import LearningBox from '../components/EntityCard';
import Card from '../components/Card';
import CollapsibleList from '../components/CollapsibleList';
import ActivityItem from '../components/ActivityItem';
import { useAuthContext } from '../utilities/hooks/useAuthContext';
import { Await, useLoaderData } from 'react-router';
import { Suspense } from 'react';
import { ICourse } from '../utilities/types';

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

// TODO: move to utilities / use library
const formatDate = (date: string) => {
  const dateFromString = new Date(date);
  return new Intl.DateTimeFormat('sv-SE').format(dateFromString);
};

const DashboardPage = () => {
  const { user } = useAuthContext();
  const { course } = useLoaderData();

  return (
    <>
      <Typography variant="h1" sx={{ marginBottom: '1rem' }}>
        Välkommen {user.fullName}!
      </Typography>
      <DashboardGrid>
        <Card>
          <Typography variant="h2" sx={{ marginBottom: '1rem' }}>
            Min kurs
          </Typography>
          <CardGrid>
            <Suspense>
              <Await resolve={course}>
                {(course: ICourse) => (
                  <LearningBox
                    title={course.name}
                    text={course.description.substring(0, 50) + '...'} // TODO: do better
                    date={{ start: formatDate(course.startDate) }}
                    link="/course"
                  />
                )}
              </Await>
            </Suspense>
          </CardGrid>
        </Card>
        <Card>
          <Typography variant="h2">Kommande aktiviteter</Typography>
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
