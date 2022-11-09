import path from 'path';
import { IResource } from '../../../shared/IResource';

export const updateResourceImagesPathAbsolute = (
  resource: IResource,
  projectPath: string,
  fileProtocol: string
): IResource => {
  return {
    ...resource,
    thumbnails: resource.thumbnails?.map(
      (thumbnail) => fileProtocol + path.join(projectPath, thumbnail)
    ),
  };
};
