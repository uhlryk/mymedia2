import fetch from '../../../../utils/fetch';
import { IProject } from '../../../../../shared/IProject';

export const removeProjectFromList = async (projectId: string): Promise<IProject[]> => fetch<IProject[]>('remove-project', projectId);
