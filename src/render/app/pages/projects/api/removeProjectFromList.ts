import fetch from '../../../../utils/fetch';
import { IProject } from '../../../../../shared/IProject';
import { REMOVE_PROJECT_CHANNEL } from '../../../../../shared/IPCChannels';

export const removeProjectFromList = async (
  projectId: string
): Promise<IProject[]> => fetch<IProject[]>(REMOVE_PROJECT_CHANNEL, projectId);
