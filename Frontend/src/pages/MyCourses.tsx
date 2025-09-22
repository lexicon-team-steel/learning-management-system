import { ReactElement } from 'react';
import { Container } from '@mui/material';
import decodeToken from '../utilities/token/decodeToken';
import { getTokens } from '../utilities/token';
import CoursesBoard from '../components/CoursesBoard';


const MyCourses = (): ReactElement => {
  const token = getTokens();
  console.log(decodeToken(token ? token.accessToken : ''));

  return (
    <>
      <Container maxWidth="xl">
        <CoursesBoard />
      </Container>
    </>
  );
};

export default MyCourses;
