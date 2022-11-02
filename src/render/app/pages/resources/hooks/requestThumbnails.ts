import { IResource } from '../../../../../shared/IResource';
import fetch from '../../../../utils/fetch';

type IInputRequestThumbnails = {
    projectFolderPath: string,
    resourceList: IResource[],
    stopProcess: boolean
}

export async function* requestThumbnails({ projectFolderPath, resourceList, stopProcess }: IInputRequestThumbnails): AsyncIterable<IResource> {
    for (const resource of resourceList) {
        if (stopProcess) break;
        if (!resource.thumbnails) {
            // TODO: check if there is specified number of thumbnails e.g. 4 if less then we also need create missing thumbnails
            const updatedResource = await fetch<IResource>('set/resource-extra', {
                projectPath: projectFolderPath,
                resourcePath: resource.relativePath,
            })
            if (stopProcess) {
                return;
            }
            if (!updatedResource) {
                continue;
            }
            yield updatedResource;
        }
    }
    return;
}