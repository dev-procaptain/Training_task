import { createTheme } from '@mui/material/styles';

export const controlPanelTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c9cff',
    },
    background: {
      default: '#0f1117',
      paper: '#161b26',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    text: {
      primary: '#f0f2f8',
      secondary: '#9aa3b5',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: '0.95rem',
      letterSpacing: '0.02em',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.7rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#9aa3b5',
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#7c9cff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
