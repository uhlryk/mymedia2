import * as path from "path";
import { IProject } from "../../shared/IProject";
import ElectronStore from "electron-store";
import { v4 as uuidv4 } from 'uuid';
import { IResource } from "../../shared/IResource";
export default class Store {
    static PROJECT_FOLDER = "mymedia";

    static RESOURCE_COLLECTION = "resources";
    static TAG_COLLECTION = "tags";
    private _store;

    constructor(projectFolderPath: string) {
        const databasePath = path.resolve(
            projectFolderPath,
            Store.PROJECT_FOLDER
        )
        this._store = new ElectronStore({
            schema: {
                [Store.RESOURCE_COLLECTION]: {
                    type: "array"
                },
                [Store.TAG_COLLECTION]: {
                    type: "array"
                }
            },
            cwd: databasePath
        });
    }

    getResource(id: string): IResource {
        return this.getResourceList().find(resource => resource.id === id);
    }

    getResourceList(): Array<IResource> {
        const resourceList: Array<IResource> | unknown = this._store.get(Store.RESOURCE_COLLECTION, []);
        if (!resourceList) {
            throw new Error("Project List doesn't exist");
        }
        return resourceList as Array<IResource>;
    }

    addResource(resource: Omit<IResource, 'id'>): IResource {
        const resourceWithId: IResource = {
            ...resource,
            id: uuidv4()
        }
        const resourceList = this._store.get(Store.RESOURCE_COLLECTION, []) as Array<IResource>;

        resourceList.push(resourceWithId);
        this._store.set(Store.RESOURCE_COLLECTION, resourceList);

        return resourceWithId;
    }
}
