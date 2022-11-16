import fetch from '../../../../utils/fetch';
import { IProject } from '../../../../../shared/IProject';
import { GET_PROJECT_LIST_CHANNEL } from '../../../../../shared/IPCChannels';

export const getProjectList = async (): Promise<IProject[]> =>
  fetch<IProject[]>(GET_PROJECT_LIST_CHANNEL);
