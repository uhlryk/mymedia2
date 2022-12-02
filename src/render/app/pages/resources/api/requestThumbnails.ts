import fetch from '../../../../utils/fetch';
import { IResource } from '../../../../../shared/IResource';
import { SET_RESOURCE_EXTRA_CHANNEL } from '../../../../../shared/IPCChannels';

export const requestThumbnails = async (
  projectId: string,
  resourceId: string
): Promise<IResource> =>
  fetch<IResource>(SET_RESOURCE_EXTRA_CHANNEL, {
    projectId,
    resourceId,
  });
