import { dialog, ipcMain } from 'electron';
import { IProject } from '../../shared/IProject';
import Store from './Store';

export default class ProjectList {
  store: Store;

  constructor() {
    console.log('Init ProjectList');
    this.store = new Store();

    ipcMain.handle(
      'get-project-list',
      async (event, message): Promise<IProject[]> => {
        const projectList = this.store.getProjectList();
        return projectList;
      }
    );

    ipcMain.handle(
      'open-folder-dialog',
      async (event, message): Promise<string> => {
        const dialogResponse = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });
        return dialogResponse.filePaths[0];
      }
    );

    ipcMain.handle(
      'add-new-project',
      async (
        event,
        projectWithoutId: Omit<IProject, 'id'>
      ): Promise<IProject> => {
        const project = this.store.addProject(projectWithoutId);
        return project;
      }
    );

    ipcMain.handle(
      'remove-project',
      async (event, projectId: string): Promise<IProject[]> => {
        const projectList = this.store.removeProject(projectId);
        return projectList;
      }
    );
  }
}
