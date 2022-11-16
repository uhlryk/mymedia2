import { ipcMain, shell } from 'electron';
import path from 'path';
import { IResource } from '../../shared/IResource';
import { SpecificProject } from './SpecificProject';
import { IAbsoluteResourceId } from './interfaces';
import { calculateExtraResourceProps } from './utils/thumbnails/calculateExtraResourceProps';
import { updateResourceListImagesPathAbsolute } from './utils/updateResourceListImagesPathAbsolute';
import { updateResourceImagesPathAbsolute } from './utils/updateResourceImagesPathAbsolute';
import { getVideoResourceById } from './utils/getVideoResourceById';
import { SET_PROJECT_DATA_CHANNEL, SET_RESOURCE_EXTRA_CHANNEL, PLAY_VIDEO_CHANNEL } from '../../shared/IPCChannels';

export default class Project {
  static VIDEO_EXTENSIONS = ['.mp4', '.wmv', '.mov', '.avi'];
  static PROJECT_DATA_FOLDER = 'mymedia';
  static THUMBNAILS_FOLDER = 'thumbnails';
  static FILE_PROTOCOL = 'file://';

  private specificProject: SpecificProject;

  constructor() {
    ipcMain.handle(
      SET_PROJECT_DATA_CHANNEL,
      async (event, projectPath: string): Promise<IResource[]> => {
        console.log('[Project/set/project-data] start');

        if (
          !this.specificProject ||
          !this.specificProject.verifyProjectPath(projectPath)
        ) {
          console.log('[Project/set/project-data] new SpecificProject');
          this.specificProject = new SpecificProject(projectPath);
        }

        await this.specificProject.waitForResourcesPromise();

        return updateResourceListImagesPathAbsolute(
          this.specificProject.getResources(),
          projectPath,
          Project.FILE_PROTOCOL
        );
      }
    );

    ipcMain.handle(
      SET_RESOURCE_EXTRA_CHANNEL,
      async (
        event,
        { projectPath, resourceId }: IAbsoluteResourceId
      ): Promise<IResource | null> => {
        console.log(`[Project/set/resource-extra] start ${resourceId}`);
        try {
          const resource = await getVideoResourceById(
            this.specificProject,
            projectPath,
            resourceId
          );

          const resourcePartial = await calculateExtraResourceProps(
            projectPath,
            resource
          );
          const updatedResource = this.specificProject.updateResource(
            resource.id,
            resourcePartial
          );
          console.log(`[Project/set/resource-extra] finished ${resourceId}`);
          return updateResourceImagesPathAbsolute(
            updatedResource,
            projectPath,
            Project.FILE_PROTOCOL
          );
        } catch (err) {
          console.error(`[Project/set/resource-extra] error ${resourceId}`);
          console.error(err);
          return null;
        }
      }
    );

    ipcMain.handle(
      PLAY_VIDEO_CHANNEL,
      async (
        event,
        { projectPath, resourceId }: IAbsoluteResourceId
      ): Promise<boolean | null> => {
        console.log('[Project/set/resource-extra] start');
        try {
          const resource = await getVideoResourceById(
            this.specificProject,
            projectPath,
            resourceId
          );

          shell.openPath(path.join(projectPath, resource.relativePath));
        } catch (err) {
          return null;
        }
      }
    );
  }
}
