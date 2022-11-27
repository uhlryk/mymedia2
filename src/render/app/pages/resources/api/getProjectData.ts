import fetch from '../../../../utils/fetch';
import { SET_PROJECT_DATA_CHANNEL } from '../../../../../shared/IPCChannels';
import { IProjectDetails } from '../../../../../shared/IProjectDetails';

export const getProjectData = async (
  projectFolderPath: string
): Promise<IProjectDetails> =>
  fetch<IProjectDetails>(SET_PROJECT_DATA_CHANNEL, projectFolderPath);
