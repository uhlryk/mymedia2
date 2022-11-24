import React, { useContext, ReactElement } from 'react';
import { AppStore } from '../../store/useAppStore';
import { AppStoreContext } from '../../store/AppStoreContextProvider';

import { ResourceStoreContextProvider } from './store/ResourceStoreContextProvider';
import { Box } from '@mui/material';
import { FilterSidePanel } from './components/FilterSidePanel';
import {
  Outlet
} from "react-router-dom";

export const ResourcePage = (): ReactElement => {
  const [{ project }] = useContext<AppStore>(AppStoreContext);

  return (
    <ResourceStoreContextProvider projectPath={project.folderPath}>
      <Box display="flex" flexDirection="row">
        <FilterSidePanel />
        <Outlet />
      </Box>


    </ResourceStoreContextProvider>
  );
};
