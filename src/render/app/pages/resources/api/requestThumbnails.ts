import fetch from '../../../../utils/fetch';
import { IResource } from '../../../../../shared/IResource';

export const requestThumbnails = async (
  projectFolderPath: string,
  resourceId: string
): Promise<IResource> =>
  fetch<IResource>('set-resource-extra', {
    projectPath: projectFolderPath,
    resourceId,
  });
