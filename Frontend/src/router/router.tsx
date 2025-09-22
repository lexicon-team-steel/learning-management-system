import { createBrowserRouter } from 'react-router';
import Layout from '../pages/Layout';
import Login from '../components/Login';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import Dashboard from '../pages/Dashboard';

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
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
