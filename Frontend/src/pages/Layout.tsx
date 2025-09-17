import { Outlet } from 'react-router';
import { Header } from '../features/shared/components';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
