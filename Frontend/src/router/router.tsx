import { createBrowserRouter } from 'react-router';
import Layout from '../pages/Layout';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import { Companies, Company } from '../features/companies/components';
import { companiesLoader, companyLoader } from '../features/companies/loaders';
import Sandbox from '../pages/Sandbox';
import LoginPage from '../pages/LoginPage';
import { participantsLoader } from '../utilities/loaders/participantsLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: requireAuthLoader,
    children: [
      {
        index: true,
        element: <Companies />,
        loader: companiesLoader,
      },
      {
        path: 'companies/:id',
        element: <Company />,
        loader: ({ params }) => companyLoader(params.id),
      },
      {
        path: 'sandbox',
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
