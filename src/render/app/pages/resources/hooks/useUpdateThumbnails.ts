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
    let stopProcess = false;
    if (projectId) {
      const updateThumbnails = async () => {
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
        updateThumbnails();
      }
    }
    return () => {
      stopProcess = true;
    };
  }, [isLoaded, projectId]);
};
