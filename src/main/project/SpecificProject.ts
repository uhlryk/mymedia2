import path from 'path';
import Store from './Store';
import Project from './Project';
import { initProject } from './utils/initProject';
import { syncResources } from './utils/syncResources';
import { IResource, IChangeResource } from '../../shared/IResource';
import { ITag } from '../../shared/ITag';
import { ITagGroup } from '../../shared/ITagGroup';
import { IProject } from '../../shared/IProject';

export class SpecificProject {
  private store: Store;
  private projectPath: string;
  private projectDataPath: string;
  private syncResourceStatusPromise: Promise<void> | null;
  private resources: IResource[] | null;

  constructor(private project: IProject) {
    this.projectPath = this.project.folderPath;
    this.projectDataPath = path.resolve(this.projectPath, Project.PROJECT_DATA_FOLDER)
  }

  private async syncResources(): Promise<void> {
    console.log('Start syncResources');
    this.store = await initProject(
      this.projectDataPath,
      Project.THUMBNAILS_FOLDER
    );

    const resourceList = this.store.getResourceList();
    const updatedResourceList = await syncResources(
      this.projectPath,
      resourceList
    );

    this.store.setResourceList(updatedResourceList);
    this.resources = updatedResourceList;
    console.log('Finish syncResources');
  }

  getProjectId(): string {
    return this.project?.id;
  }

  getProjectPath(): string {
    return this.projectPath;
  }

  verifyProject(projectId: string): boolean {
    return this.getProjectId() === projectId;
  }

  waitForResourcesPromise(): Promise<void> {
    if (!this.syncResourceStatusPromise) {
      this.syncResourceStatusPromise = this.syncResources();
    }
    return this.syncResourceStatusPromise;
  }

  getResources(): IResource[] {
    if (this.resources) {
      return this.resources;
    } else {
      throw new Error('resources are not ready');
    }
  }

  getResourceById(resourceId: string): IResource {
    return this.getResources().find((resource) => resource.id === resourceId);
  }

  updateResource(
    resourceId: string,
    resourcePartial: IChangeResource
  ): IResource {
    const oldResource = this.getResourceById(resourceId);
    // we want to preserve reference
    Object.assign(oldResource, resourcePartial);
    this.store.setResourceList(this.getResources());
    return oldResource;
  }

  addNewTag(name: string, parentId: string = null): ITag {
    const tag = this.store.addNewTag(name, parentId);

    return tag;
  }

  getTagGroups(): ITagGroup[] {
    return this.store.getTagGroups();
  }
}
