import fetch from '../../../../utils/fetch';
import { IProject } from '../../../../../shared/IProject';
import { ADD_NEW_PROJECT_CHANNEL } from '../../../../../shared/IPCChannels';

export const addNewProject = async (
  projectName: string,
  projectFolderPath: string
): Promise<IProject> =>
  fetch<IProject>(ADD_NEW_PROJECT_CHANNEL, {
    name: projectName,
    folderPath: projectFolderPath,
  });
