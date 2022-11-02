import fetch from '../../../../utils/fetch';
import { IResource } from '../../../../../shared/IResource';

export const requestThumbnails = async (
  projectFolderPath: string,
  resourceRelativePath: string
): Promise<IResource> =>
  fetch<IResource>('set/resource-extra', {
    projectPath: projectFolderPath,
    resourcePath: resourceRelativePath,
  });
