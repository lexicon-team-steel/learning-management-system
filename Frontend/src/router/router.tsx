import { createBrowserRouter } from 'react-router';
import { App } from '../features/app';
import { Login } from '../features/auth/components';
import { requireAuthLoader } from '../features/auth/loaders';
import { Companies, Company } from '../features/companies/components';
import { companiesLoader, companyLoader } from '../features/companies/loaders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
