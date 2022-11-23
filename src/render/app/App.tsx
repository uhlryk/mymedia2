import { Box, CssBaseline } from '@mui/material';
import React, { FC } from 'react';
import './App.css';
import { TopPanel } from './components/TopPanel';
import { AppRouter } from './components/AppRouter';
import { AppStoreContextProvider } from './store/AppStoreContextProvider';

export const App: FC = () => {
  return (
    <AppStoreContextProvider>
      <Box display="flex">
        <CssBaseline />
        <TopPanel />
        <Box sx={{ marginTop: '75px', width: '100%' }}>
          <AppRouter />
        </Box>
      </Box>
    </AppStoreContextProvider>
  );
};
