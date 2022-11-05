import { Dispatch, SetStateAction, useEffect } from 'react';
import { IResource } from '../../../../../shared/IResource';
import { requestThumbnailsGenerator } from './requestThumbnailsGenerator';

type IInputUseUpdateThumbanails = {
  projectFolderPath: string;
  isLoading: boolean;
  resourceList: IResource[];
  setResourceList: Dispatch<SetStateAction<IResource[]>>;
};
export const useUpdateThumbanails = ({
  projectFolderPath,
  isLoading,
  resourceList,
  setResourceList,
}: IInputUseUpdateThumbanails): void => {
  useEffect(() => {
    let stopProcess = false;
    const updateThumbnails = async () => {
      if (!isLoading) {
        const asyncGenRequestThumbnails = requestThumbnailsGenerator({
          projectFolderPath,
          resourceList,
        });
        for await (const updatedResource of asyncGenRequestThumbnails) {
          if (stopProcess) {
            break;
          }

          // this is using as a base resourceList whic don't have changes from prev update. We should create a store and send to update specific resource only
          const updatedResourceList = resourceList.map((resource) =>
            resource.id === updatedResource.id ? updatedResource : resource
          );
          setResourceList(updatedResourceList);
        }
      }
    };
    updateThumbnails();
    return () => {
      stopProcess = true;
    };
  }, [isLoading]);
};
