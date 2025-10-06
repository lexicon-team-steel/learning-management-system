import './styles/index.css';

import { createRoot } from 'react-dom/client';
import { router } from './router';
import { AuthProvider } from './utilities/context/auth/authProvider';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { CssBaseline } from '@mui/material';
import { CoursesProvider } from './utilities/context/course/coursesProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CoursesProvider>
      <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <RouterProvider router={router} />
          </LocalizationProvider>
      </ThemeProvider>
    </CoursesProvider>
  </AuthProvider>
);
