import { Outlet } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Main from '../components/Main';

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default Layout;
