import { Dispatch, useEffect } from 'react';
import { IResource } from '../../../../../shared/IResource';
import { updateResource } from '../store/resourcesStoreActions';
import { ResourceAction } from '../store/useResourcesStore';
import { requestThumbnailsGenerator } from './requestThumbnailsGenerator';

type IInputUseUpdateThumbanails = {
  projectFolderPath: string;
  isLoaded: boolean;
  resources: IResource[];
  dispatchResourcesState: Dispatch<ResourceAction>;
};
export const useUpdateThumbanails = ({
  projectFolderPath,
  isLoaded,
  resources,
  dispatchResourcesState,
}: IInputUseUpdateThumbanails): void => {
  useEffect(() => {
    let stopProcess = false;
    const updateThumbnails = async () => {
      const asyncGenRequestThumbnails = requestThumbnailsGenerator({
        projectFolderPath,
        resources,
      });
      for await (const updatedResource of asyncGenRequestThumbnails) {
        if (stopProcess) {
          break;
        }
        dispatchResourcesState(updateResource(updatedResource))
      }

    };
    if (isLoaded) {
      updateThumbnails();
    }
    return () => {
      stopProcess = true;
    };
  }, [isLoaded]);
};
