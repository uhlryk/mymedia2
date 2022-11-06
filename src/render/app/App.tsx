import { Box, CssBaseline } from '@mui/material';
import React, { FC } from 'react';
import './App.css';

import { ResourcePage } from './pages/resources/ResourcePage';
import { ProjectPage } from './pages/projects/ProjectPage';
import { CreateProjectPage } from './pages/createProject/CreateProjectPage';
import { Page } from './store/useAppStore';
import { TopPanel } from './components/TopPanel';
import { Router } from './components/Router';
import { AppStoreContextProvider } from './store/AppStoreContextProvider';

const pages = {
  [Page.PROJECT_PAGE]: <ProjectPage />,
  [Page.RESOURCE_PAGE]: <ResourcePage />,
  [Page.CREATE_PROJECT_PAGE]: <CreateProjectPage />,
};
export const App: FC = () => {
  return (
    <AppStoreContextProvider>
      <Box display="flex">
        <CssBaseline />
        <TopPanel />
        <Router pages={pages} />
      </Box>
    </AppStoreContextProvider>
  );
};
