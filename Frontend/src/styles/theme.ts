import { createTheme } from '@mui/material/styles';

// rules in theme will apply to all components of the project
// example: color for variants, can be changed
const theme = createTheme({
  palette: {
    primary: {
      main: '#2664eb',
    },
    secondary: {
      main: '#1f40ae',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#f7f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#374152',
      secondary: '#6c7180',
    },
  },
  // example: typography, can be changed
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
    h3: { fontSize: '1rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },
  spacing: 8, // if we use spacing in styling 1 will be 8px, 2 16px etc
  shape: {
    borderRadius: 8,
  },
  components: {
    // example: standard for buttons, can be changed
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
