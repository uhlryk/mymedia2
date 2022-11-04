import { IResource } from "../../../shared/IResource";
import { updateResourceImagesPathAbsolute } from './updateResourceImagesPathAbsolute';

export const updateResourceListImagesPathAbsolute = (resourceList: IResource[], projectPath: string, fileProtocol: string): IResource[] => {
  return resourceList.map((resource) => updateResourceImagesPathAbsolute(resource, projectPath, fileProtocol));
}