import { ipcMain } from "electron";
import path from "path";
import createHashFilesWithDetails from "./createHashFilesWithDetails";
import readDirectory from "./readAllFSFiles";
import Store from "./Store";


export default class Project {
    private store: Store;

    constructor() {
        ipcMain.handle('get/project-data', async (event, projectPath: string) => {
            console.log(`[Project.get/resource-list] ${projectPath}`);
            const resourceList = this.getStore(projectPath).getResourceList();

            const allFilesFromFS = await readDirectory(projectPath);
            const filesWithDetails = createHashFilesWithDetails(allFilesFromFS, projectPath);
            console.log(filesWithDetails);
            return resourceList;
        })
    }

    getStore(projectPath: string): Store {
        if (!this.store) {
            this.store = new Store(projectPath);
        }
        return this.store;
    }
}