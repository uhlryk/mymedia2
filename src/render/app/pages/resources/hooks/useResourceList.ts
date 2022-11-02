import { Dispatch, SetStateAction, useEffect } from 'react';
import { IResource } from '../../../../../shared/IResource';
import { useLoadResourceList } from './useLoadResourceList';
import { useUpdateThumbanails } from './useUpdateThumbnails';

export const useResourceList = (
  projectFolderPath: string
): [IResource[], boolean, Dispatch<SetStateAction<IResource[]>>] => {
  const [resourceList, isLoading, setResourceList] =
    useLoadResourceList(projectFolderPath);

  useUpdateThumbanails({
    projectFolderPath,
    resourceList,
    isLoading,
    setResourceList,
  });

  return [resourceList, isLoading, setResourceList];
};
