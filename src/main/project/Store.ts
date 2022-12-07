import ElectronStore from 'electron-store';
import { v4 as uuidv4 } from 'uuid';
import { IResource } from '../../shared/IResource';
import { ITag } from '../../shared/ITag';
import { ITagTree } from '../../shared/ITagTree';
import { ITagParent } from '../../shared/ITagParent';
export default class Store {
  static RESOURCE_COLLECTION = 'resources';
  static TAG_COLLECTION = 'tags';
  private _store;

  constructor(databasePath: string) {
    this._store = new ElectronStore({
      schema: {
        [Store.RESOURCE_COLLECTION]: {
          type: 'array',
        },
        [Store.TAG_COLLECTION]: {
          type: 'object',
        },
      },
      cwd: databasePath,
    });
  }

  getResource(relativePath: string): IResource {
    return this.getResourceList().find(
      (resource) => resource.relativePath === relativePath
    );
  }

  getResourceList(): Array<IResource> {
    const resourceList: Array<IResource> | unknown = this._store.get(
      Store.RESOURCE_COLLECTION,
      []
    );
    if (!resourceList) {
      throw new Error("Project List doesn't exist");
    }
    return resourceList as Array<IResource>;
  }

  setResourceList(resourceList: IResource[]): IResource[] {
    this._store.set(Store.RESOURCE_COLLECTION, resourceList);

    return resourceList;
  }

  addNewTagParent(name: string): ITagParent {
    const tagParent: ITagParent = {
      id: uuidv4(),
      name,
      parentId: null,
      children: {}
    };
    const tagTree: ITagTree = this._store.get(
      Store.TAG_COLLECTION,
      {}
    ) as ITagTree;


    tagTree[tagParent.id] = tagParent;

    this._store.set(Store.TAG_COLLECTION, tagTree);

    return tagParent;
  }

  addNewTag(name: string, parentId: string): ITag {
    const tag: ITag = {
      id: uuidv4(),
      name,
      parentId
    };
    const tagTree: ITagTree = this._store.get(
      Store.TAG_COLLECTION,
      {}
    ) as ITagTree;

    tagTree[parentId].children[tag.id] = tag;
    this._store.set(Store.TAG_COLLECTION, tagTree);

    return tag;
  }

  getTagTree(): ITagTree {
    return this._store.get(
      Store.TAG_COLLECTION,
      {}
    ) as ITagTree;
  }
}
