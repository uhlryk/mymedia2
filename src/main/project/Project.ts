import { ipcMain, shell } from 'electron';
import path from 'path';
import { IResource } from '../../shared/IResource';
import { SpecificProject } from './SpecificProject';
import { IAbsoluteResourceId, IAbsoluteResourceIdChanges } from './interfaces';
import { calculateExtraResourceProps } from './utils/thumbnails/calculateExtraResourceProps';
import { updateResourceListImagesPathAbsolute } from './utils/updateResourceListImagesPathAbsolute';
import { updateResourceImagesPathAbsolute } from './utils/updateResourceImagesPathAbsolute';
import { getVideoResourceById } from './utils/getVideoResourceById';
import { SET_PROJECT_DATA_CHANNEL, SET_RESOURCE_EXTRA_CHANNEL, PLAY_VIDEO_CHANNEL, CHANGE_RESOURCE, ADD_NEW_TAG_CHANNEL, ADD_NEW_TAG_PARENT_CHANNEL } from '../../shared/IPCChannels';
import { ITag } from '../../shared/ITag';
import { IProjectDetails } from '../../shared/IProjectDetails';
import ProjectList from '../projectList/ProjectList';
import { checkSpecificProject } from './utils/checkSpecificProject';
import { ITagParent } from '../../shared/ITagParent';

export default class Project {
  static VIDEO_EXTENSIONS = ['.mp4', '.wmv', '.mov', '.avi'];
  static PROJECT_DATA_FOLDER = 'mymedia';
  static THUMBNAILS_FOLDER = 'thumbnails';
  static FILE_PROTOCOL = 'file://';

  private specificProject: SpecificProject;

  constructor(private projectList: ProjectList) { }

  listen(): void {
    ipcMain.handle(
      SET_PROJECT_DATA_CHANNEL,
      async (event, projectId: string): Promise<IProjectDetails> => {
        console.log('[Project/set/project-data] start');

        try {
          await checkSpecificProject(this.specificProject, projectId);
        } catch {
          console.log('[Project/set/project-data] new SpecificProject');
          const project = this.projectList.getSpecificProject(projectId);
          this.specificProject = new SpecificProject(project);
          await this.specificProject.waitForResourcesPromise();
        }

        return {
          resources: updateResourceListImagesPathAbsolute(
            this.specificProject.getResources(),
            this.specificProject.getProjectPath(),
            Project.FILE_PROTOCOL
          ),
          tagTree: this.specificProject.getTagTree()
        }
      }
    );

    ipcMain.handle(
      SET_RESOURCE_EXTRA_CHANNEL,
      async (
        event,
        { projectId, resourceId }: IAbsoluteResourceId
      ): Promise<IResource | null> => {
        console.log(`[Project/set/resource-extra] start ${resourceId}`);
        try {
          checkSpecificProject(this.specificProject, projectId);

          const resource = await getVideoResourceById(
            this.specificProject,
            resourceId
          );

          const resourcePartial = await calculateExtraResourceProps(
            this.specificProject.getProjectPath(),
            resource
          );
          const updatedResource = this.specificProject.updateResource(
            resource.id,
            resourcePartial
          );
          console.log(`[Project/set/resource-extra] finished ${resourceId}`);
          return updateResourceImagesPathAbsolute(
            updatedResource,
            this.specificProject.getProjectPath(),
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
        { projectId, resourceId }: IAbsoluteResourceId
      ): Promise<boolean | null> => {
        console.log('[Project/set/resource-extra] start');
        try {
          checkSpecificProject(this.specificProject, projectId);

          const resource = await getVideoResourceById(
            this.specificProject,
            resourceId
          );

          shell.openPath(path.join(this.specificProject.getProjectPath(), resource.relativePath));
        } catch (err) {
          return null;
        }
      }
    );

    ipcMain.handle(CHANGE_RESOURCE, async (event, { projectId, resourceId, props }: IAbsoluteResourceIdChanges): Promise<IResource> => {
      try {
        checkSpecificProject(this.specificProject, projectId);
        const resource = await getVideoResourceById(
          this.specificProject,
          resourceId
        );

        const updatedResource = this.specificProject.updateResource(
          resource.id,
          props
        );
        return updateResourceImagesPathAbsolute(
          updatedResource,
          this.specificProject.getProjectPath(),
          Project.FILE_PROTOCOL
        );
      } catch (err) {
        return null;
      }
    });

    ipcMain.handle(ADD_NEW_TAG_CHANNEL, async (event, { projectId, tagName, parentTagId }): Promise<ITag> => {
      try {
        checkSpecificProject(this.specificProject, projectId);
        const tag = this.specificProject.addNewTag(tagName, parentTagId);

        return tag;
      } catch (err) {
        return null;
      }
    })

    ipcMain.handle(ADD_NEW_TAG_PARENT_CHANNEL, async (event, { projectId, tagName }): Promise<ITagParent> => {
      try {
        checkSpecificProject(this.specificProject, projectId);
        const tagParent = this.specificProject.addNewTagParent(tagName);

        return tagParent;
      } catch (err) {
        return null;
      }
    })
  }
}
