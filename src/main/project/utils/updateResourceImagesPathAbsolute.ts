import path from 'path';
import { IResource } from '../../../shared/IResource';

export const updateResourceImagesPathAbsolute = (
  resource: IResource,
  projectPath: string,
  fileProtocol: string
): IResource => {
  return {
    ...resource,
    mainThumbnail: resource.mainThumbnail && fileProtocol + path.join(projectPath, resource.mainThumbnail),
    thumbnails: resource.thumbnails?.map(
      (thumbnail) => fileProtocol + path.join(projectPath, thumbnail)
    ),
  };
};
