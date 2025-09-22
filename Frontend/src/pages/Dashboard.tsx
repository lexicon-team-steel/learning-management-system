import { Container } from '@mui/material';
import GreetingUser from '../components/GreetingUser';
import BoxHerizontal from '../components/boxes/BoxHorizontal';
import { mockCourse, mockUser } from '../components/boxes/mockData';

const Dashboard = () => {
  const { title, course, info, dateStart, dateEnd } = mockCourse;
  const { firstName, lastName } = mockUser;
  return (
    <Container component="section">
      <GreetingUser firstName={firstName} lastName={lastName} />
      <BoxHerizontal
        title={title}
        course={course}
        info={info}
        dateStart={dateStart}
        dateEnd={dateEnd}
        component="section"
      />
    </Container>
  );
};

export default Dashboard;
