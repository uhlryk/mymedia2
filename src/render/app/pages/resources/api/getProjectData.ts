import fetch from '../../../../utils/fetch';
import { IResource } from '../../../../../shared/IResource';
import { SET_PROJECT_DATA_CHANNEL } from '../../../../../shared/IPCChannels';

export const getProjectData = async (
  projectFolderPath: string
): Promise<IResource[]> =>
  fetch<IResource[]>(SET_PROJECT_DATA_CHANNEL, projectFolderPath);
