import { Container, Typography } from '@mui/material';
import { ReactElement } from 'react';

interface IGreetingProps {
  firstName: string;
  lastName: string;
}
const GreetingUser = ({ firstName, lastName }: IGreetingProps): ReactElement => {
  return (
    <Container>
      <Typography variant="h1">
        Välkommen {firstName} {lastName} !
      </Typography>
    </Container>
  );
};

export default GreetingUser;
