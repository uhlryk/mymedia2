import { dialog, ipcMain } from "electron";
import { IProject } from "../../shared/IProject";
import Store from "./Store";

export default class ProjectList {
  store: Store;

  constructor() {
    console.log("Init ProjectList");
    this.store = new Store();

    ipcMain.handle("get/project-list", async (event, message) => {
      const projectList = this.store.getProjectList();
      return projectList;
    });

    ipcMain.handle("get/new-project-folder", async (event, message) => {
      const dialogResponse = await dialog.showOpenDialog({
        properties: ["openDirectory"]
      });
      return dialogResponse.filePaths[0];
    });

    ipcMain.handle(
      "set/new-project",
      async (event, projectWithId: Omit<IProject, "id">) => {
        const projectList = this.store.addProject(projectWithId);
        return projectList;
      }
    );
  }
}
