import { ipcMain, shell } from 'electron';
import path from 'path';
import { IResource, IResourceTag } from '../../shared/IResource';
import { SpecificProject } from './SpecificProject';
import { IAbsoluteResourceId, IAbsoluteResourceIdChanges } from './interfaces';
import { calculateExtraResourceProps } from './utils/thumbnails/calculateExtraResourceProps';
import { updateResourceListImagesPathAbsolute } from './utils/updateResourceListImagesPathAbsolute';
import { updateResourceImagesPathAbsolute } from './utils/updateResourceImagesPathAbsolute';
import { getVideoResourceById } from './utils/getVideoResourceById';
import { SET_PROJECT_DATA_CHANNEL, GENERATE_ALL_THUMBNAILS_CHANNEL, PLAY_VIDEO_CHANNEL, CHANGE_RESOURCE, ADD_NEW_TAG_CHANNEL, ADD_NEW_TAG_PARENT_CHANNEL, ADD_RESOURCE_TAG_CHANNEL, GENERATE_MAIN_THUMBNAIL_CHANNEL } from '../../shared/IPCChannels';
import { ITag } from '../../shared/ITag';
import { IProjectDetails } from '../../shared/IProjectDetails';
import ProjectList from '../projectList/ProjectList';
import { checkSpecificProject } from './utils/checkSpecificProject';
import { ITagParent } from '../../shared/ITagParent';
import { calculateFastMainThumbnail } from './utils/thumbnails/calculateFastMainThumbnail';

export default class Project {
  static VIDEO_EXTENSIONS = ['.mp4', '.wmv', '.mov', '.avi'];
  static PROJECT_DATA_FOLDER = 'mymedia';
  static THUMBNAILS_FOLDER = 'thumbnails';
  static MAIN_THUMBNAIL_FOLDER = 'thumbnail';
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
      GENERATE_MAIN_THUMBNAIL_CHANNEL,
      async (
        event,
        { projectId, resourceId }: IAbsoluteResourceId
      ): Promise<IResource | null> => {
        console.log(`[Project/generate-main-thumbnail-channel] start ${resourceId}`);
        try {
          checkSpecificProject(this.specificProject, projectId);

          const resource = await getVideoResourceById(
            this.specificProject,
            resourceId
          );

          const resourcePartial = await calculateFastMainThumbnail(
            this.specificProject.getProjectPath(),
            resource
          );
          const updatedResource = this.specificProject.updateResource(
            resource.id,
            resourcePartial
          );
          console.log(`[Project/generate-main-thumbnail-channel] finished ${resourceId}`);
          return updateResourceImagesPathAbsolute(
            updatedResource,
            this.specificProject.getProjectPath(),
            Project.FILE_PROTOCOL
          );
        } catch (err) {
          console.error(`[Project/generate-main-thumbnail-channel] error ${resourceId}`);
          console.error(err);
          return null;
        }
      }
    );

    ipcMain.handle(
      GENERATE_ALL_THUMBNAILS_CHANNEL,
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

    ipcMain.handle(ADD_RESOURCE_TAG_CHANNEL, async (event, { projectId, resourceId, tagParentId, tagId }: IAbsoluteResourceId & IResourceTag): Promise<void> => {
      try {
        checkSpecificProject(this.specificProject, projectId);
        const resource = await getVideoResourceById(
          this.specificProject,
          resourceId
        );

        resource.tags.push({
          tagParentId, tagId
        })
        this.specificProject.updateResource(
          resource.id,
          resource
        );
        return null;
      } catch (err) {
        return null;
      }
    })
  }
}
