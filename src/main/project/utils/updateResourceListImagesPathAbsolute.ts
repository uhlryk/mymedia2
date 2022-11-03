import path from 'path';
import { IResource } from "../../../shared/IResource";

export const updateResourceListImagesPathAbsolute = (resourceList: IResource[], projectPath: string, fileProtocol: string) => {
  return resourceList.map((resource) => ({
    ...resource,
    thumbnails: resource.thumbnails?.map(
      (thumbnail) => fileProtocol + path.join(projectPath, thumbnail)
    ),
  }));
}