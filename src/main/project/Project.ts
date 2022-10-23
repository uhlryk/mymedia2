import { ipcMain } from "electron";
import createDiffResourceHashes from "./helpers/createDiffResourceHashes";
import createResourceHash from "./helpers/createResourceHash";
import readDirectory from "./helpers/readAllFsFiles";
import Store from "./Store";

export default class Project {
    private store: Store;
    private storeProjectPath: string;

    constructor() {
        ipcMain.handle('get/project-data', async (event, projectPath: string) => {
            const resourceList = this.getStore(projectPath).getResourceList();
            const allFilesFromFs = await readDirectory(projectPath);
            const resourceHash = createResourceHash(allFilesFromFs, projectPath);
            const diffResourceHashes = createDiffResourceHashes(resourceHash, resourceList);
            const updatedResourceList = this.getStore(projectPath).setResourceList(Object.values({ ...diffResourceHashes.exisitingFiles, ...diffResourceHashes.newFiles }))

            return updatedResourceList;
        })
    }

    getStore(projectPath: string): Store {
        if (!this.store || this.storeProjectPath !== projectPath) {
            this.store = new Store(projectPath);
            this.storeProjectPath = projectPath;
        }
        return this.store;
    }
}