import { Outlet } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
