import path from 'path';
import Store from './Store';
import Project from './Project';
import { initProject } from './utils/initProject';
import { syncResources } from './utils/syncResources';
import { IResource, IChangeResource } from '../../shared/IResource';
import { ITag } from '../../shared/ITag';
import { IProject } from '../../shared/IProject';
import { ITagTree } from '../../shared/ITagTree';
import { ITagParent } from '../../shared/ITagParent';

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

  private async createInitTags(updatedResourceList: IResource[]): Promise<IResource[]> {
    console.log("[syncResources] create initial tags");
    const folderGroupTag = this.addNewTagParent('folder');
    const folderTagsMap = new Map<string, ITag>();
    updatedResourceList.forEach(resource => {
      const folderTagName = path.dirname(resource.relativePath).split(path.sep)[0];
      if (folderTagName) {
        let folderTag;
        if (folderTagsMap.has(folderTagName)) {
          folderTag = folderTagsMap.get(folderTagName);
        } else {
          folderTag = this.addNewTag(folderTagName, folderGroupTag.id);
          folderTagsMap.set(folderTagName, folderTag);
        }
        resource.tags.push({
          tagId: folderTag.id,
          tagParentId: folderGroupTag.id
        });
      }

    })

    return updatedResourceList;
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

    const updatedResourceListWithTags = await this.createInitTags(updatedResourceList);
    this.store.setResourceList(updatedResourceListWithTags);



    this.resources = updatedResourceListWithTags;
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

  addNewTag(name: string, parentId: string): ITag {
    const tag = this.store.addNewTag(name, parentId);

    return tag;
  }

  addNewTagParent(name: string): ITagParent {
    const tagParent = this.store.addNewTagParent(name);

    return tagParent;
  }

  getTagTree(): ITagTree {
    return this.store.getTagTree();
  }
}
