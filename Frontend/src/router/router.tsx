import { createBrowserRouter } from 'react-router';
import Layout from '../pages/Layout';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import Dashboard from '../pages/Dashboard';
import Sandbox from '../pages/Sandbox';
import LoginPage from '../pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: requireAuthLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'sandbox',
        element: <Sandbox />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
