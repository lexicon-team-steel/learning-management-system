import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '../pages/Layout';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import DashboardPage from '../pages/DashboardPage';
import Sandbox from '../pages/Sandbox';
import LoginPage from '../pages/LoginPage';
import { dashboardLoader } from '../utilities/loaders/dashboardLoader';
import CoursePage from '../pages/CoursePage';
import { moduleLoader } from '../utilities/loaders/moduleLoader';
import { courseLoader, myCourseLoader } from '../utilities/loaders/courseLoader';
import { allCoursesLoader } from '../utilities/loaders/allCoursesLoader';
import NotAuthorized from '../pages/NotAuthorized';
import CoursesPage from '../pages/CoursesPage';

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
        path: '*',
        element: <Sandbox />,
      },
      {
        path: 'courses',
        element: <CoursesPage />,
        loader: allCoursesLoader,
      },
      {
        path: 'courses/:id',
        element: <CoursePage />,
        loader: courseLoader,
        children: [],
      },
      {
        path: 'course',
        element: <div />,
        loader: myCourseLoader,
      },
      {
        path: 'courses/:courseId/modules/:moduleId',
        // element: < ModulePage />, // TODO: to be implemented later
        loader: moduleLoader,
      },
      { path: 'notauthorized', element: <NotAuthorized /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
