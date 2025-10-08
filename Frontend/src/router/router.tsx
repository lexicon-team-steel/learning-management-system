import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '../pages/Layout';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import DashboardPage from '../pages/DashboardPage';
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
import { adminCoursesAction } from '../utilities/actions/adminCoursesAction';
import { adminUsersAction } from '../utilities/actions/adminUsersAction';
import NotFoundPage from '../pages/NotFoundPage';
import { adminActivitiesLoader } from '../utilities/loaders/adminActivitiesLoader';
import AdminActivitiesPage from '../pages/AdminActivitiesPage';
import AdminModulesPage from '../pages/AdminModulesPage';
import { adminModulesLoader } from '../utilities/loaders/adminModulesLoader';
import LoadingSpinner from '../components/LoadingSpinner';
import { adminModulesAction } from '../utilities/actions/adminModulesAction';
import AdminParticipantsPage from '../pages/AdminParticipantsPage';
import { adminParticipantsLoader } from '../utilities/loaders/adminParticipantsLoader';
import { adminParticipantsAction } from '../utilities/actions/adminParticipantsAction';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: requireAuthLoader,
    hydrateFallbackElement: <LoadingSpinner />,
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
        errorElement: <NotFoundPage />,
      },
      {
        path: 'courses/:courseId/modules/:moduleId',
        element: <ModulePage />,
        loader: moduleLoader,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'admin/users',
        element: <AdminUsersPage />,
        loader: adminUsersLoader,
        action: adminUsersAction,
      },
      {
        path: 'admin/courses',
        element: <AdminCoursesPage />,
        loader: adminCoursesLoader,
        action: adminCoursesAction,
      },
      {
        path: 'admin/courses/:courseId/participants',
        element: <AdminParticipantsPage />,
        loader: adminParticipantsLoader,
        action: adminParticipantsAction,
      },
      {
        path: 'admin/courses/:courseId/modules',
        element: <AdminModulesPage />,
        loader: adminModulesLoader,
        action: adminModulesAction,
        errorElement: <NotFoundPage />,
      },
      {
        path: 'admin/courses/:courseId/modules/:moduleId',
        element: <AdminActivitiesPage />,
        loader: adminActivitiesLoader,
        errorElement: <NotFoundPage />,
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
