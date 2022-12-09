import fetch from '../../../../../../utils/fetch';
import { ITag } from '../../../../../../../shared/ITag';
import { ADD_RESOURCE_TAG_CHANNEL } from '../../../../../../../shared/IPCChannels';

export const addResourceTag = async (
    projectId: string,
    resourceId: string,
    tagParentId: string,
    tagId: string,
): Promise<ITag> =>
    fetch<ITag>(ADD_RESOURCE_TAG_CHANNEL, {
        projectId,
        resourceId,
        tagParentId,
        tagId
    });
