import './styles/base.css';

import { createRoot } from 'react-dom/client';
import { router } from './router';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider } from './utilities/context/auth/AuthProvider';
import { CoursesProvider } from './utilities/context/course/CoursesProvider';
import { AlertProvider } from './utilities/context/alert/AlertProvider';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CoursesProvider>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <RouterProvider router={router} />
          </LocalizationProvider>
        </AlertProvider>
      </ThemeProvider>
    </CoursesProvider>
  </AuthProvider>
);
