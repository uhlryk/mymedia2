import { Box, CssBaseline } from '@mui/material';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { TopPanel } from './components/TopPanel';
// import { AppStoreContextProvider } from './store/AppStoreContextProvider';
import { store } from './store/store'
import { Provider } from 'react-redux'

export const App: FC = () => {
  return (
    <Provider store={store}>
      <Box display="flex">
        <CssBaseline />
        <TopPanel />
        <Box sx={{ marginTop: '75px', width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </Provider>
  );
};
