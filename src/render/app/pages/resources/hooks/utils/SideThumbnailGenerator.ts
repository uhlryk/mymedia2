import { IInputThumbnailGenerator, ThumbnailGenerator } from "./ThumbnailGenerator";
import { IResource } from '../../../../../../shared/IResource';
import { requestThumbnails } from '../../api/requestThumbnails';
import { countThumbnails } from "./countThumbnails";

export type IInputSideThumbnailGenerator = Omit<Omit<IInputThumbnailGenerator, 'processor'>, 'numberOfJobs'>

export class SideThumbnailGenerator extends ThumbnailGenerator {
    constructor({ projectId, resources, abortSignal }: IInputSideThumbnailGenerator) {
        super({
            projectId,
            resources,
            processor: async (projectId: string, resource: IResource) => {
                if (countThumbnails(resource.thumbnails) < 4) {
                    return await requestThumbnails(
                        projectId,
                        resource.id
                    );
                }
            },
            abortSignal,
            numberOfJobs: 1
        })

    }
}