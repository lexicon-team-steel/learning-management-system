import { Outlet } from 'react-router';
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import { Box, styled } from '@mui/material';

const LayoutFlexBox = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
}));

const Layout = () => {
  return (
    <>
      <Header />
      <LayoutFlexBox>
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </LayoutFlexBox>
    </>
  );
};

export default Layout;
