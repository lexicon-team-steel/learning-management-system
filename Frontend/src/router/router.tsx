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
import { teacherCoursesLoader } from '../utilities/loaders/teacherCoursesLoader';
import NotAuthorized from '../pages/NotAuthorized';
import CoursesPage from '../pages/CoursesPage';
import ModulePage from '../pages/ModulePage';
import AdminCoursesPage from '../pages/AdminCoursesPage';
import { adminCoursesLoader } from '../utilities/loaders/adminCoursesLoader';
import { adminUsersLoader } from '../utilities/loaders/adminUsersLoader';
import AdminUsersPage from '../pages/AdminUsersPage';

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
        loader: teacherCoursesLoader,
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
        element: <ModulePage />,
        loader: moduleLoader,
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
      { path: 'notauthorized', element: <NotAuthorized /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
