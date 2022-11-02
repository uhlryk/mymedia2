import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { IResource } from '../../../../../shared/IResource';
import fetch from '../../../../utils/fetch';

export const useResourceList = (
  projectFolderPath: string
): [IResource[], boolean, Dispatch<SetStateAction<IResource[]>>] => {
  const [resourceList, setResourceList] = useState<IResource[]>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch<IResource[]>('set/project-data', projectFolderPath).then(
      (resourceList) => {
        setResourceList(resourceList);
        setLoading(false);
        console.log(resourceList);
      }
    );
  }, []);


  useEffect(() => {
    let stopProcess = false;
    if (!isLoading) {
      const requestThumbnails = async () => {
        for (const resource of resourceList) {
          if (stopProcess) break;
          if (!resource.thumbnails) {
            // TODO: check if there is specified number of thumbnails e.g. 4 if less then we also need create missing thumbnails
            await fetch<IResource>('set/resource-extra', {
              projectPath: projectFolderPath,
              resourcePath: resource.relativePath,
            }).then((updatedResource) => {
              if (stopProcess) {
                return;
              }
              if (!updatedResource) {
                return;
              }
              const resourceIndex = resourceList.findIndex(
                (resource) =>
                  resource.relativePath === updatedResource.relativePath
              );
              if (resourceIndex !== -1) {
                resourceList[resourceIndex].thumbnails =
                  updatedResource.thumbnails;
              }
              setResourceList(resourceList.slice());
            });
          }
        }
      };
      requestThumbnails();
    }
    return () => {
      stopProcess = true;
    };
  }, [isLoading]);

  return [resourceList, isLoading, setResourceList];
};
