import { dialog, ipcMain } from 'electron';
import path from 'path';
import { IProject } from '../../shared/IProject';
import Store from './Store';
import { GET_PROJECT_LIST_CHANNEL, OPEN_FOLDER_DIALOG_CHANNEL, ADD_NEW_PROJECT_CHANNEL, REMOVE_PROJECT_CHANNEL } from '../../shared/IPCChannels';

export default class ProjectList {
  store: Store;

  constructor() {
    console.log('Init ProjectList');
    this.store = new Store();

    ipcMain.handle(
      GET_PROJECT_LIST_CHANNEL,
      async (event, message): Promise<IProject[]> => {
        const projectList = this.store.getProjectList();
        return projectList;
      }
    );

    ipcMain.handle(
      OPEN_FOLDER_DIALOG_CHANNEL,
      async (event, message): Promise<[string, string]> => {
        const dialogResponse = await dialog.showOpenDialog({
          properties: ['openDirectory'],
        });
        const filePath = dialogResponse.filePaths[0];
        const name = path.parse(filePath).name;
        return [filePath, name];
      }
    );

    ipcMain.handle(
      ADD_NEW_PROJECT_CHANNEL,
      async (
        event,
        projectWithoutId: Omit<IProject, 'id'>
      ): Promise<IProject> => {
        const project = this.store.addProject(projectWithoutId);
        return project;
      }
    );

    ipcMain.handle(
      REMOVE_PROJECT_CHANNEL,
      async (event, projectId: string): Promise<IProject[]> => {
        const projectList = this.store.removeProject(projectId);
        return projectList;
      }
    );
  }
}
