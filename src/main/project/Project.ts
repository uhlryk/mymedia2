import { ipcMain } from "electron";
import createHashFilesWithDetails from "./createHashFilesWithDetails";
import readDirectory from "./readAllFsFiles";
import Store from "./Store";


export default class Project {
    private store: Store;

    constructor() {
        ipcMain.handle('get/project-data', async (event, projectPath: string) => {
            console.log(`[Project.get/resource-list] ${projectPath}`);
            const resourceList = this.getStore(projectPath).getResourceList();

            const allFilesFromFs = await readDirectory(projectPath);
            const filesWithDetails = createHashFilesWithDetails(allFilesFromFs, projectPath);
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