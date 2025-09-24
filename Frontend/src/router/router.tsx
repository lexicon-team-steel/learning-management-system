import { createBrowserRouter } from 'react-router';
import Layout from '../pages/Layout';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import DashboardPage from '../pages/DashboardPage';
import Sandbox from '../pages/Sandbox';
import LoginPage from '../pages/LoginPage';
import { participantsLoader } from '../utilities/loaders/participantsLoader';
import { dashboardLoader } from '../utilities/loaders/dashboardLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: requireAuthLoader,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
        loader: dashboardLoader,
      },
      {
        path: 'sandbox',
        element: <Sandbox />,
        loader: participantsLoader,
      },
      {
        path: '*',
        element: <Sandbox />,
        loader: participantsLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
