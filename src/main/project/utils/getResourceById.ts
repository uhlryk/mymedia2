import { IResource } from '../../../shared/IResource';
import { SpecificProject } from '../SpecificProject';

export const getResourceById = async (
  specificProject: SpecificProject,
  resourceId: string
): Promise<IResource> => {
  const resource = specificProject.getResourceById(resourceId);
  if (!resource) {
    console.error(`Requested resource by id ${resourceId} not found`);
    throw new Error('Resource not found');
  }

  return resource;
};
