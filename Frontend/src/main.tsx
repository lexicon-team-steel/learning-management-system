import './styles/index.css';

import { createRoot } from 'react-dom/client';
import { router } from './router';
import { AuthProvider } from './utilities/context/auth/authProvider';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { CssBaseline } from '@mui/material';
import { CoursesProvider } from './utilities/context/course/coursesProvider';
import { AlertProvider } from './utilities/context/alert/AlertProvider';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CoursesProvider>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </AlertProvider>
      </ThemeProvider>
    </CoursesProvider>
  </AuthProvider>
);
