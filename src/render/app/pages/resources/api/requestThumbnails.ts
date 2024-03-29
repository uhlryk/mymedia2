import fetch from '../../../../utils/fetch';
import { IResource } from '../../../../../shared/IResource';
import { GENERATE_ALL_THUMBNAILS_CHANNEL } from '../../../../../shared/IPCChannels';

export const requestThumbnails = async (
  projectId: string,
  resourceId: string
): Promise<IResource> =>
  fetch<IResource>(GENERATE_ALL_THUMBNAILS_CHANNEL, {
    projectId,
    resourceId,
  });
