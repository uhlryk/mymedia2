import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { IResource } from '../../../../../shared/IResource';
import fetch from '../../../../utils/fetch';
import { requestThumbnails } from './requestThumbnails';

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
    const updateThumbnails = async () => {
      if (!isLoading) {
        const asyncGenRequestThumbnails = requestThumbnails({
          projectFolderPath,
          resourceList,
          stopProcess
        });
        for await (const updatedResource of asyncGenRequestThumbnails) {
          const resourceIndex = resourceList.findIndex(
            (resource) =>
              resource.id === updatedResource.id
          );
          if (resourceIndex !== -1) {
            resourceList[resourceIndex] = updatedResource;
          }
          const updatedResourceList = resourceList.slice();
          updatedResourceList[resourceIndex] = updatedResource
          setResourceList(updatedResourceList);
        }
      }
    }
    updateThumbnails();
    return () => {
      stopProcess = true;
    };
  }, [isLoading]);

  return [resourceList, isLoading, setResourceList];
};
