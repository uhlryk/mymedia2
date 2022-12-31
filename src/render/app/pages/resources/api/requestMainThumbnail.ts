import fetch from '../../../../utils/fetch';
import { IResource } from '../../../../../shared/IResource';
import { GENERATE_MAIN_THUMBNAIL_CHANNEL } from '../../../../../shared/IPCChannels';

export const requestMainThumbnail = async (
  projectId: string,
  resourceId: string
): Promise<IResource> =>
  fetch<IResource>(GENERATE_MAIN_THUMBNAIL_CHANNEL, {
    projectId,
    resourceId,
  });
