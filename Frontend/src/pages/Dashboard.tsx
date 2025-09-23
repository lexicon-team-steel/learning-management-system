import { Box, Container, styled } from '@mui/material';
import GreetingUser from '../components/GreetingUser';
import { mockCourse, mockUser } from '../components/boxes/mockData';
import Heading from '../components/Heading';
import LearningBox from '../components/boxes/LearningBox';
import LmsBox from '../components/boxes/LmsBox';
import Activities from '../components/Activities';

const DashboardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  alignItems: 'start',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '2fr 1fr',
  },
}));
const InnerGridBox = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

const Dashboard = () => {
  const { course, info, dateStart, dateEnd } = mockCourse;
  const { firstName, lastName } = mockUser;

  return (
    <Container component="section">
      <GreetingUser firstName={firstName} lastName={lastName} />
      <DashboardGrid>
        <LmsBox size="md">
          <Heading variant={'h2'} title="Min kurs" />
          <InnerGridBox>
            {course && info && dateStart && (
              <LearningBox course={course} info={info} dateStart={dateStart} dateEnd={dateEnd} />
            )}
          </InnerGridBox>
        </LmsBox>
        <LmsBox size="xs">
          <Heading variant={'h4'} title="Kommande aktivititer" />
          <Activities activities={mockCourse.activities} />
        </LmsBox>
      </DashboardGrid>
    </Container>
  );
};

export default Dashboard;
