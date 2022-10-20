import { ipcMain } from "electron";
import Store from "./Store";

export default class ProjectList {
    store: Store;

    constructor() {
        console.log("Init ProjectList");
        this.store = new Store();
        console.log(this.store.getProjectList());

        ipcMain.handle('get/project-list', async (event, message) => {
            const projectList = this.store.getProjectList();
            // console.log(event)
            console.log(message)
            return projectList;
        })
    }
}