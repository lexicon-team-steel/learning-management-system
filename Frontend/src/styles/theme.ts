import { createTheme } from '@mui/material/styles';
import colors from './colors';
// rules in theme will apply to all components of the project
// example: color for variants, can be changed

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'secondary-link': true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primaryBlue,
    },
    secondary: {
      main: colors.secondaryBlue,
    },
    error: {
      main: colors.error,
    },
    background: {
      default: colors.primaryBg,
      paper: colors.lightBg,
    },
    text: {
      primary: colors.textColorDark,
      secondary: colors.textColorLight,
    },
  },
  // example: typography, can be changed
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
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
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: colors.chipBgColor,
          color: colors.chipTextColor,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.lightBg,
          color: colors.textColorDark,
        },
      },
    },
    MuiLink: {
      variants: [
        {
          props: { variant: 'secondary-link' },
          style: ({ theme }) => ({
            color: theme.palette.text.secondary,
            textDecoration: 'none',
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }),
        },
      ],
    },
  },
});

export default theme;
