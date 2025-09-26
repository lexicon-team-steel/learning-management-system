import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '../pages/Layout';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import DashboardPage from '../pages/DashboardPage';
import Sandbox from '../pages/Sandbox';
import LoginPage from '../pages/LoginPage';
import { dashboardLoader } from '../utilities/loaders/dashboardLoader';
import CoursePage from '../pages/CoursePage';
import { courseLoader, defaultCourseLoader } from '../utilities/loaders/courseLoader';
import CourseListBoard from '../components/CourseListBoard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: requireAuthLoader,
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
        path: 'courses', //TODO: Some preparation for the teacher courses route. Needs restriction!
        element: <CourseListBoard />, //This component is open for modification :)
      },
      {
        path: 'courses/:id',
        element: <CoursePage />,
        loader: courseLoader,
      },
      {
        path: 'course',
        element: <div />,
        loader: defaultCourseLoader,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
