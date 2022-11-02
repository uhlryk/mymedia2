import * as path from 'path';
import ElectronStore from 'electron-store';
import { IResource } from '../../shared/IResource';
export default class Store {
  static RESOURCE_COLLECTION = 'resources';
  static TAG_COLLECTION = 'tags';
  private _store;

  constructor(projectFolderPath: string, projectDataFolder: string) {
    const databasePath = path.resolve(projectFolderPath, projectDataFolder);
    this._store = new ElectronStore({
      schema: {
        [Store.RESOURCE_COLLECTION]: {
          type: 'array',
        },
        [Store.TAG_COLLECTION]: {
          type: 'array',
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
}
