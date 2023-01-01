import { useEffect } from 'react';
import { selectCurrentProject } from '../../../store/projectsSlice';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { selectIsProjectDetailsLoaded, selectResouceList, updateResource } from '../store/resourcesSlice';
import { updateThumbnails } from './utils/updateThumbnails';

export const useUpdateThumbanails = (): void => {
  const currentProject = useAppSelector(selectCurrentProject);
  const projectId = currentProject?.id;

  const isLoaded = useAppSelector(selectIsProjectDetailsLoaded);
  const resourceList = useAppSelector(selectResouceList);
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(`[useUpdateThumbanails] executed useEffect`);
    let stopProcess = false;
    if (currentProject && (currentProject.id === projectId)) {
      if (isLoaded) {
        console.log(`[useUpdateThumbanails] details loaded`);
        updateThumbnails({
          projectId,
          resourceList,
          callback: (updatedResource) => dispatch(updateResource(updatedResource)),
          abortSignal: () => {
            return stopProcess;
          }
        });
      } else {
        console.log(`[useUpdateThumbanails] details not loaded yet`);
      }
    }
    return () => {
      stopProcess = true;
    };
  }, [isLoaded, currentProject, projectId]);
};
