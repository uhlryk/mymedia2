import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { IResource } from '../../../../../shared/IResource';
import { getProjectData } from '../api/getProjectData';

export const useLoadResourceList = (
  projectFolderPath: string
): [IResource[], boolean, Dispatch<SetStateAction<IResource[]>>] => {
  const [resourceList, setResourceList] = useState<IResource[]>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProjectData(projectFolderPath).then((resourceList) => {
      setResourceList(resourceList);
      setLoading(false);
    });
  }, []);

  return [resourceList, isLoading, setResourceList];
};
