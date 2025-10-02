import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '../pages/Layout';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import DashboardPage from '../pages/DashboardPage';
import Sandbox from '../pages/Sandbox';
import LoginPage from '../pages/LoginPage';
import { dashboardLoader } from '../utilities/loaders/dashboardLoader';
import CoursePage from '../pages/CoursePage';
import { moduleLoader } from '../utilities/loaders/moduleLoader';
import { courseLoader } from '../utilities/loaders/courseLoader';
import NotAuthorizedPage from '../pages/NotAuthorizedPage';
import ModulePage from '../pages/ModulePage';
import AdminCoursesPage from '../pages/AdminCoursesPage';
import { adminCoursesLoader } from '../utilities/loaders/adminCoursesLoader';
import { adminUsersLoader } from '../utilities/loaders/adminUsersLoader';
import AdminUsersPage from '../pages/AdminUsersPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: requireAuthLoader,
    hydrateFallbackElement: <Sandbox />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        loader: dashboardLoader,
      },
      {
        path: 'courses/:id',
        element: <CoursePage />,
        loader: courseLoader,
        children: [],
        errorElement: <NotFoundPage />, //Remove when ErrorPage is implemented
      },
      {
        path: 'courses/:courseId/modules/:moduleId',
        element: <ModulePage />,
        loader: moduleLoader,
        errorElement: <NotFoundPage />, //Remove when ErrorPage is implemented
      },
      {
        path: 'admin/users',
        element: <AdminUsersPage />,
        loader: adminUsersLoader,
      },
      {
        path: 'admin/courses',
        element: <AdminCoursesPage />,
        loader: adminCoursesLoader,
      },
      /* ---- Add new routes above this comment for a neater structure ---- */
      { path: 'notauthorized', element: <NotAuthorizedPage /> },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
