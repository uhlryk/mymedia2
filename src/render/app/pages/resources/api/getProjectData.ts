import fetch from '../../../../utils/fetch';
import { IResource } from '../../../../../shared/IResource';

export const getProjectData = async (
  projectFolderPath: string
): Promise<IResource[]> =>
  fetch<IResource[]>('set-project-data', projectFolderPath);
