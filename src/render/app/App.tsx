import { Box, CssBaseline } from '@mui/material';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { TopPanel } from './components/TopPanel';
import { AppStoreContextProvider } from './store/AppStoreContextProvider';

export const App: FC = () => {
  return (
    <AppStoreContextProvider>
      <Box display="flex">
        <CssBaseline />
        <TopPanel />
        <Box sx={{ marginTop: '75px', width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </AppStoreContextProvider>
  );
};
