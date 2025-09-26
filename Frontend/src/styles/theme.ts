import { createTheme } from '@mui/material/styles';
import colors from './colors';
// rules in theme will apply to all components of the project
// example: color for variants, can be changed

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'secondary-link': true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    layout: {
      pageMargin: string;
      gap: string;
      gapLarge: string;
    };
  }
  interface ThemeOptions {
    layout: {
      pageMargin: string;
      gap: string;
      gapLarge: string;
    };
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
    h1: { fontSize: '1.5rem', fontWeight: 600 },
    h2: { fontSize: '1.2rem', fontWeight: 600 },
    h3: { fontSize: '1rem', fontWeight: 600 },
    h4: { fontSize: '0.8rem', fontWeight: 600 },
    body1: { fontSize: '0.75rem' },
    body2: { fontSize: '0.7rem' },
    caption: { color: colors.textColorLight },
  },
  spacing: 8, // if we use spacing in styling 1 will be 8px, 2 16px etc
  shape: {
    borderRadius: 8,
  },
  layout: {
    pageMargin: '1.5rem',
    gap: '1rem',
    gapLarge: '1.5rem',
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
          style: () => ({
            color: colors.textColorLight,
            textDecoration: 'none',
            '&:hover': {
              color: colors.primaryBlue,
            },
          }),
        },
      ],
    },
  },
});

export default theme;
