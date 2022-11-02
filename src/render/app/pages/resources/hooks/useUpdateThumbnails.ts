import { Dispatch, SetStateAction, useEffect } from 'react';
import { IResource } from '../../../../../shared/IResource';
import { requestThumbnails } from './requestThumbnails';

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
                const asyncGenRequestThumbnails = requestThumbnails({
                    projectFolderPath,
                    resourceList
                });
                for await (const updatedResource of asyncGenRequestThumbnails) {
                    if (stopProcess) {
                        break;
                    }
                    const resourceIndex = resourceList.findIndex(
                        (resource) => resource.id === updatedResource.id
                    );
                    if (resourceIndex !== -1) {
                        resourceList[resourceIndex] = updatedResource;
                    }
                    const updatedResourceList = resourceList.slice();
                    updatedResourceList[resourceIndex] = updatedResource;
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
