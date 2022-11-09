import fetch from '../../../../utils/fetch';
import { IProject } from '../../../../../shared/IProject';

export const addNewProject = async (
  projectName: string,
  projectFolderPath: string
): Promise<IProject> =>
  fetch<IProject>('add-new-project', {
    name: projectName,
    folderPath: projectFolderPath,
  });
