import React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { controlPanelTheme } from '../../theme/controlPanelTheme';
import Control from './index';

const SIDEBAR_WIDTH = 320;

const ControlPanelShell = () => (
  <ThemeProvider theme={controlPanelTheme}>
    <CssBaseline />
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        minWidth: SIDEBAR_WIDTH,
        height: '100%',
        flexShrink: 0,
      }}
    >
      <Control />
    </Box>
  </ThemeProvider>
);

export default ControlPanelShell;
