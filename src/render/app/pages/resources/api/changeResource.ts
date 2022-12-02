import fetch from '../../../../utils/fetch';
import { CHANGE_RESOURCE } from '../../../../../shared/IPCChannels';
import { IChangeResource, IResource } from '../../../../../shared/IResource';

export const changeResource = async (
  projectId: string,
  resourceId: string,
  props: IChangeResource,
): Promise<IResource | null> =>
  fetch<IResource | null>(CHANGE_RESOURCE, {
    projectId,
    resourceId: resourceId,
    props
  });
