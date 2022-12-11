import { useEffect } from 'react';
import { selectCurrentProject } from '../../../store/projectsSlice';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { requestThumbnailsGenerator } from './requestThumbnailsGenerator';
import { selectIsProjectDetailsLoaded, selectResouceList, updateResource } from '../store/resourcesSlice';

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
      const updateThumbnails = async () => {
        console.log(`[useUpdateThumbanails] start updating thumbnails`);
        const asyncGenRequestThumbnails = requestThumbnailsGenerator({
          projectId,
          resources: resourceList,
        });
        for await (const updatedResource of asyncGenRequestThumbnails) {
          if (stopProcess) {
            break;
          }
          dispatch(updateResource(updatedResource));
        }
      };
      if (isLoaded) {
        console.log(`[useUpdateThumbanails] details loaded`);
        updateThumbnails();
      } else {
        console.log(`[useUpdateThumbanails] details not loaded yet`);
      }
    }
    return () => {
      stopProcess = true;
    };
  }, [isLoaded, currentProject, projectId]);
};
