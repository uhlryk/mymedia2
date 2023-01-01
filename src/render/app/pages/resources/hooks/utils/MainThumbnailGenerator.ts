import { IInputThumbnailGenerator, ThumbnailGenerator } from "./ThumbnailGenerator";
import { IResource } from '../../../../../../shared/IResource';
import { requestMainThumbnail } from '../../api/requestMainThumbnail';

export type IInputMainThumbnailGenerator = Omit<Omit<IInputThumbnailGenerator, 'processor'>, 'numberOfJobs'>;

export class MainThumbnailGenerator extends ThumbnailGenerator {
    constructor({ projectId, resources, abortSignal }: IInputMainThumbnailGenerator) {
        super({
            projectId,
            resources,
            processor: async (projectId: string, resource: IResource) => {
                if (!resource.mainThumbnail) {
                    return await requestMainThumbnail(
                        projectId,
                        resource.id
                    );
                }
            },
            abortSignal,
            numberOfJobs: 3
        })

    }
}