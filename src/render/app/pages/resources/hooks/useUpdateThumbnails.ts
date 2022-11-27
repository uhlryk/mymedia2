import { useEffect } from 'react';
import { selectCurrentProject } from '../../../store/projectsSlice';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { requestThumbnailsGenerator } from './requestThumbnailsGenerator';
import { selectIsProjectDetailsLoaded, selectResouceList, updateResource } from '../store/resourcesSlice';

export const useUpdateThumbanails = (): void => {
  const currentProject = useAppSelector(selectCurrentProject);
  const folderPath = currentProject?.folderPath;

  const isLoaded = useAppSelector(selectIsProjectDetailsLoaded);
  const resourceList = useAppSelector(selectResouceList);
  const dispatch = useAppDispatch()

  useEffect(() => {
    let stopProcess = false;
    if (folderPath) {
      const updateThumbnails = async () => {
        const asyncGenRequestThumbnails = requestThumbnailsGenerator({
          projectFolderPath: folderPath,
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
  }, [isLoaded, folderPath]);
};
