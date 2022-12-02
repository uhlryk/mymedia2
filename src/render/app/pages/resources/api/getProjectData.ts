import fetch from '../../../../utils/fetch';
import { SET_PROJECT_DATA_CHANNEL } from '../../../../../shared/IPCChannels';
import { IProjectDetails } from '../../../../../shared/IProjectDetails';

export const getProjectData = async (
  projectId: string
): Promise<IProjectDetails> =>
  fetch<IProjectDetails>(SET_PROJECT_DATA_CHANNEL, projectId);
