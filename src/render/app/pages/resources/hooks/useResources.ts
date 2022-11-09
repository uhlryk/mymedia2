import { useEffect } from 'react';
import { useUpdateThumbanails } from './useUpdateThumbnails';
import { getProjectData } from '../api/getProjectData';
import { useResourcesStore, ResourceStore } from '../store/useResourcesStore';
import { setResources } from '../store/resourcesStoreActions';

export const useResources = (projectFolderPath: string): ResourceStore => {
  const [resourcesState, dispatchResourcesState] = useResourcesStore();
  useEffect(() => {
    getProjectData(projectFolderPath).then((resources) => {
      dispatchResourcesState(setResources(resources));
    });
  }, []);

  useUpdateThumbanails({
    projectFolderPath,
    resources: resourcesState.resources,
    isLoaded: resourcesState.isLoaded,
    dispatchResourcesState,
  });

  return [resourcesState, dispatchResourcesState];
};
