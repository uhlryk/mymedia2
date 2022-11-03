import { ipcMain } from 'electron';
import { IResource } from '../../shared/IResource';
import createFolderStructure from './utils/syncResources/createFolderStructure';
import Store from './Store';
import * as path from 'path';
import fs from 'fs/promises';
import generateThumbnail from './utils/generateThumbnail';
import getMetadata from './utils/getMetadata';
import { syncResources } from './utils/syncResources';
import { updateResourceListImagesPathAbsolute } from './utils/updateResourceListImagesPathAbsolute';

export default class Project {
  static EXTENSIONS_FOR_THUMBNAILS = ['.mp4', '.wmv', '.mov', '.avi'];
  static PROJECT_DATA_FOLDER = 'mymedia';
  static THUMBNAILS_FOLDER = 'thumbnails';
  static FILE_PROTOCOL = 'file://';
  private store: Store;
  private projectPath: string;
  private cachedResources: IResource[];

  constructor() {
    ipcMain.handle(
      'set/project-data',
      async (event, projectPath: string): Promise<IResource[]> => {
        console.log('[Project/set/project-data] start');
        if (this.projectPath !== projectPath) {
          console.log('change project');

          this.projectPath = projectPath;
          createFolderStructure(
            projectPath,
            Project.PROJECT_DATA_FOLDER,
            Project.THUMBNAILS_FOLDER
          );
          this.store = new Store(projectPath, Project.PROJECT_DATA_FOLDER);

          const resourceList = this.store.getResourceList();

          const updatedResourceList = await syncResources(this.projectPath, resourceList);

          this.store.setResourceList(updatedResourceList);
          this.cachedResources = updatedResourceList;

          return updateResourceListImagesPathAbsolute(updatedResourceList, projectPath, Project.FILE_PROTOCOL)
        } else {
          return updateResourceListImagesPathAbsolute(this.cachedResources, projectPath, Project.FILE_PROTOCOL)
        }
      }
    );

    ipcMain.handle(
      'set/resource-extra',
      async (
        event,
        {
          projectPath,
          resourcePath,
        }: {
          projectPath: string;
          resourcePath: string;
        }
      ) => {
        console.log('[Project/set/resource-extra] start');
        if (projectPath !== this.projectPath) {
          console.error(
            `Requested path ${projectPath} is different than current project path ${this.projectPath}`
          );
          return null;
        }
        const resourceIndex = this.cachedResources.findIndex(
          (cachedResource) => cachedResource.relativePath === resourcePath
        );
        if (resourceIndex === -1) {
          console.error(`Requested resource by path ${resourcePath} not found`);
          return null;
        }
        const resource = this.cachedResources[resourceIndex];

        const extension = resource.extension;
        if (!Project.EXTENSIONS_FOR_THUMBNAILS.includes(extension)) {
          console.error(
            `Requested resource by path ${resourcePath} extension ${extension} is not supported for thumbnails`
          );
          return null;
        }
        const absoluteResourcePath = path.join(
          projectPath,
          resource.relativePath
        );
        const absoluteSpecificThumbnailPath = path.join(
          projectPath,
          Project.PROJECT_DATA_FOLDER,
          Project.THUMBNAILS_FOLDER,
          resource.id,
          '1.jpg'
        );
        const relativeSpecificThumbnailPath = path.join(
          Project.PROJECT_DATA_FOLDER,
          Project.THUMBNAILS_FOLDER,
          resource.id,
          '1.jpg'
        );

        try {
          const metadata = await getMetadata(absoluteResourcePath);
          if (await fileExists(absoluteSpecificThumbnailPath)) {
            const updatedResource = {
              ...resource,
              thumbnails: [relativeSpecificThumbnailPath],
              ...metadata,
            };
            this.cachedResources[resourceIndex] = updatedResource;
            this.store.setResourceList(this.cachedResources);
            return {
              ...updatedResource,
              thumbnails: [
                Project.FILE_PROTOCOL + path.join(absoluteSpecificThumbnailPath),
              ],
            };
          }
          if (
            await generateThumbnail(
              absoluteResourcePath,
              absoluteSpecificThumbnailPath,
              metadata.duration
            )
          ) {
            const updatedResource = {
              ...resource,
              thumbnails: [relativeSpecificThumbnailPath],
              ...metadata,
            };
            this.cachedResources[resourceIndex] = updatedResource;
            this.store.setResourceList(this.cachedResources);
            return {
              ...updatedResource,
              thumbnails: [
                Project.FILE_PROTOCOL + path.join(absoluteSpecificThumbnailPath),
              ],
            };
          } else {
            return null;
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
  }
}

const fileExists = async (filePath: string) =>
  !!(await fs.stat(filePath).catch((e) => false));
