import { IResource } from '../../../../../../shared/IResource';
import { MainThumbnailGenerator } from './MainThumbnailGenerator';
import { SideThumbnailGenerator } from './SideThumbnailGenerator';

export type IUpdateThumbnail = {
    projectId: string,
    resourceList: IResource[],
    callback: (resource: IResource) => void,
    abortSignal: () => boolean
}
export const updateThumbnails = async ({ projectId, resourceList, callback, abortSignal }: IUpdateThumbnail) => {
    console.log(`[useUpdateThumbanails] start updating thumbnails`);

    const mainThumbnailGenerator = new MainThumbnailGenerator({
        projectId,
        resources: resourceList,
        abortSignal
    });

    mainThumbnailGenerator.onResourceReady((updatedResource) => {
        callback(updatedResource);
    })

    await mainThumbnailGenerator.calculateResources();

    if (abortSignal()) {
        return;
    }

    const sideThumbnailGenerator = new SideThumbnailGenerator({
        projectId,
        resources: resourceList,
        abortSignal
    });

    sideThumbnailGenerator.onResourceReady((updatedResource) => {
        callback(updatedResource);
    })

    await sideThumbnailGenerator.calculateResources();
};