import { ipcMain } from 'electron';
import { IResource } from '../../shared/IResource';
import { SpecificProject } from './SpecificProject';
import { IAbsoluteResourceId } from './interfaces';
import { calculateExtraResourceProps } from './utils/calculateExtraResourceProps';
import { updateResourceListImagesPathAbsolute } from './utils/updateResourceListImagesPathAbsolute';
import { updateResourceImagesPathAbsolute } from './utils/updateResourceImagesPathAbsolute';

export default class Project {
  static EXTENSIONS_FOR_THUMBNAILS = ['.mp4', '.wmv', '.mov', '.avi'];
  static PROJECT_DATA_FOLDER = 'mymedia';
  static THUMBNAILS_FOLDER = 'thumbnails';
  static FILE_PROTOCOL = 'file://';

  private specificProject: SpecificProject;

  constructor() {
    ipcMain.handle(
      'set/project-data',
      async (event, projectPath: string): Promise<IResource[]> => {
        console.log('[Project/set/project-data] start');

        if (!this.specificProject || !this.specificProject.verifyProjectPath(projectPath)) {
          console.log('[Project/set/project-data] new SpecificProject');
          this.specificProject = new SpecificProject(projectPath);
        }

        await this.specificProject.waitForResourcesPromise();

        return updateResourceListImagesPathAbsolute(this.specificProject.getResources(), projectPath, Project.FILE_PROTOCOL);
      }
    );

    ipcMain.handle(
      'set/resource-extra',
      async (event, { projectPath, resourceId }: IAbsoluteResourceId): Promise<IResource | null> => {
        console.log('[Project/set/resource-extra] start');
        if (!this.specificProject || !this.specificProject.verifyProjectPath(projectPath)) {
          console.error(
            `Requested path ${projectPath} is different than current project path ${projectPath}`
          );
          return null;
        }
        await this.specificProject.waitForResourcesPromise();
        const resource = this.specificProject.getResourceById(resourceId);
        if (!resource) {
          console.error(`Requested resource by path ${resourceId} not found`);
          return null;
        }
        const resourcePartial = await calculateExtraResourceProps(projectPath, resource);
        const updatedResource = this.specificProject.updateResource(resource.id, resourcePartial);

        return updateResourceImagesPathAbsolute(updatedResource, projectPath, Project.FILE_PROTOCOL);

      });
  }
}