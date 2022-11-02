import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { IResource } from '../../../../../shared/IResource';
import fetch from '../../../../utils/fetch';

export const useLoadResourceList = (
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
      }
    );
  }, []);

  return [resourceList, isLoading, setResourceList];
};
