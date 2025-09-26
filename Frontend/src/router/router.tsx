import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '../pages/Layout';
import { requireAuthLoader } from '../utilities/loaders/requireAuthLoader';
import DashboardPage from '../pages/DashboardPage';
import Sandbox from '../pages/Sandbox';
import LoginPage from '../pages/LoginPage';
import { participantsLoader } from '../utilities/loaders/participantsLoader';
import { dashboardLoader } from '../utilities/loaders/dashboardLoader';
import CoursePage from '../pages/CoursePage';
import { courseLoader } from '../utilities/loaders/courseLoader';
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
        path: 'sandbox',
        element: <Sandbox />,
        loader: participantsLoader,
      },
      {
        path: '*',
        element: <Sandbox />,
        loader: participantsLoader,
      },
      {
        path: 'course', //TODO: Needs restriction?
        element: <CoursePage />,
        loader: courseLoader,
      },
      {
        path: 'courses', //TODO: Some preparation for the teacher courses route. Needs restriction!
        element: <CourseListBoard />, //This component is open for modification :)
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
