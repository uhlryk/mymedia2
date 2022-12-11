import React, { ReactElement, useEffect } from 'react';

import { Box } from '@mui/material';
import { FilterSidePanel } from './components/FilterSidePanel';
import {
  Outlet
} from "react-router-dom";
import { useUpdateThumbanails } from './hooks/useUpdateThumbnails';
import { useCurrentProject } from './hooks/useCurrentProject';

export const ResourcePage = (): ReactElement => {
  const isCurrentProjectReady = useCurrentProject();

  useUpdateThumbanails();

  if (!isCurrentProjectReady) {
    return <></>;
  }

  return (
    <Box display="flex" flexDirection="row">
      <FilterSidePanel />
      <Outlet />
    </Box>


  );
};
