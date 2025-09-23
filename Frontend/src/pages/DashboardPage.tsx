import { Box, styled, Typography } from '@mui/material';
import { IActivity, mockCourse, mockUser } from '../utilities/data/mockData';
import LearningBox from '../components/LearningBox';
import Card from '../components/Card';
import CollapsibleList from '../components/CollapsibleList';
import ListActivity from '../components/ListActivity';

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
  const { course, info, dateStart, dateEnd } = mockCourse;
  const { firstName, lastName } = mockUser;

  return (
    <>
      <Typography variant="h1" sx={{ marginBottom: '1rem' }}>
        Välkommen {firstName} {lastName}!
      </Typography>
      <DashboardGrid>
        <Card>
          <Typography variant="h2" sx={{ marginBottom: '1rem' }}>
            Min kurs
          </Typography>
          <CardGrid>
            {course && info && dateStart && (
              <LearningBox course={course} info={info} dateStart={dateStart} dateEnd={dateEnd} />
            )}
          </CardGrid>
        </Card>
        <Card>
          <Typography variant="h2">Kommande aktiviteter</Typography>
          <CollapsibleList
            items={mockCourse.activities}
            keyField="id"
            renderItem={(item: IActivity) => <ListActivity activity={item} />}
          />
        </Card>
      </DashboardGrid>
    </>
  );
};

export default DashboardPage;
