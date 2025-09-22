import { createBrowserRouter } from 'react-router';
import Layout from '../pages/Layout';
import Login from '../components/Login';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import { Companies, Company } from '../features/companies/components';
import { companiesLoader, companyLoader } from '../features/companies/loaders';
import MyCourses from '../pages/MyCourses';

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
        path: 'courses',
        element: <MyCourses />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
