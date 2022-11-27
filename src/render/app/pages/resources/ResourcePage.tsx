import React, { ReactElement, useEffect } from 'react';

import { Box } from '@mui/material';
import { FilterSidePanel } from './components/FilterSidePanel';
import {
  Outlet, useParams
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/store';
import { selectProjects, setCurrentProject } from '../../store/projectsSlice';
import { getProjectData } from './api/getProjectData';
import { selectResouceList, setProjectDetails } from './store/resourcesSlice';
import { useUpdateThumbanails } from './hooks/useUpdateThumbnails';

export const ResourcePage = (): ReactElement => {
  const { current: currentProject, list: projectList } = useAppSelector(selectProjects);
  const resourceList = useAppSelector(selectResouceList);


  const dispatch = useAppDispatch()
  const { projectId } = useParams();

  useEffect(() => {
    if (!currentProject || currentProject.id !== projectId) {
      const project = projectList.find(project => project.id === projectId);
      dispatch(setCurrentProject(project))
    }
  }, [currentProject, projectId]);

  useEffect(() => {
    if (currentProject) {
      getProjectData(currentProject.folderPath).then((projectDetails) => {
        dispatch(setProjectDetails(projectDetails));
      });
    }
  }, [currentProject]);

  useUpdateThumbanails();

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
