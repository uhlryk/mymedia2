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
      if (!isLoaded) {
        const asyncGenRequestThumbnails = requestThumbnailsGenerator({
          projectFolderPath,
          resources,
        });
        for await (const updatedResource of asyncGenRequestThumbnails) {
          if (stopProcess) {
            break;
          }
          dispatchResourcesState(updateResource(updatedResource))
          // this is using as a base resourceList whic don't have changes from prev update. We should create a store and send to update specific resource only
          // const updatedResourceList = resources.map((resource) =>
          //   resource.id === updatedResource.id ? updatedResource : resource
          // );
          // setResourceList(updatedResourceList);
        }
      }
    };
    updateThumbnails();
    return () => {
      stopProcess = true;
    };
  }, [isLoaded]);
};
