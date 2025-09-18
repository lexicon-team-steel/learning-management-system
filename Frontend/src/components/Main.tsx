import Container from '@mui/material/Container';
import { ReactElement, ReactNode } from 'react';
interface IMainProps {
  children: ReactNode;
}

const Main = ({ children }: IMainProps): ReactElement => {
  return <Container>{children}</Container>;
};

export default Main;
