import React, { ReactElement, useEffect } from 'react';

import { Box } from '@mui/material';
import { FilterSidePanel } from './components/FilterSidePanel';
import {
  Outlet, useParams
} from "react-router-dom";
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from '../../store/projectsSlice';

export const ResourcePage = (): ReactElement => {
  const { current: currentProject, list: projectList } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch()
  const { projectId } = useParams();

  useEffect(() => {
    if (!currentProject || currentProject.id !== projectId) {
      const project = projectList.find(project => project.id === projectId);
      dispatch(setCurrentProject(project))
    }
  }, [currentProject, projectId]);

  if (!currentProject) {
    return <></>;
  }

  return (
    <Box display="flex" flexDirection="row">
      <FilterSidePanel />
      <Outlet />
    </Box>


  );
};
