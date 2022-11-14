import { IResource } from '../../../shared/IResource';
import { SpecificProject } from '../SpecificProject';

export const getResourceById = async (
  specificProject: SpecificProject,
  projectPath: string,
  resourceId: string
): Promise<IResource> => {
  if (!specificProject || !specificProject.verifyProjectPath(projectPath)) {
    console.error(
      `Requested path ${projectPath} is different than current project path ${projectPath}`
    );
    throw new Error('Project not setup or wrong project path');
  }
  await specificProject.waitForResourcesPromise();

  const resource = specificProject.getResourceById(resourceId);
  if (!resource) {
    console.error(`Requested resource by id ${resourceId} not found`);
    throw new Error('Resource not found');
  }

  return resource;
};
