import React, { ReactElement, useEffect } from 'react';

import { Box } from '@mui/material';
import { FilterSidePanel } from './components/FilterSidePanel';
import {
  Outlet, useParams
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/store';
import { selectProjects, setCurrentProject } from '../../store/projectsSlice';
import { getProjectData } from './api/getProjectData';
import { selectIsProjectDetailsLoaded, selectResouceList, setProjectDetails, clearProjectDetails } from './store/resourcesSlice';
import { useUpdateThumbanails } from './hooks/useUpdateThumbnails';

export const ResourcePage = (): ReactElement => {
  const { current: currentProject, list: projectList } = useAppSelector(selectProjects);
  const resourceList = useAppSelector(selectResouceList);
  const isLoaded = useAppSelector(selectIsProjectDetailsLoaded);

  const dispatch = useAppDispatch()
  const { projectId } = useParams();

  useEffect(() => {
    if (!currentProject || (currentProject.id !== projectId)) {
      const project = projectList.find(project => project.id === projectId);
      dispatch(setCurrentProject(project))
      dispatch(clearProjectDetails());
    } else {
      getProjectData(currentProject.id).then((projectDetails) => {
        dispatch(setProjectDetails(projectDetails));
      });
    }
  }, [currentProject, projectId]);

  useUpdateThumbanails();

  if (!currentProject || (currentProject.id !== projectId) || !isLoaded) {
    return <></>;
  }
  console.log(`[ResourcePage] Show project ${currentProject.id} === ${projectId}`);
  return (
    <Box display="flex" flexDirection="row">
      <FilterSidePanel />
      <Outlet />
    </Box>


  );
};
