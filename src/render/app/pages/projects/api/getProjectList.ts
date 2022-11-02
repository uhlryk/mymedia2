import fetch from '../../../../utils/fetch';
import { IProject } from '../../../../../shared/IProject';

export const getProjectList = async (): Promise<IProject[]> =>
  fetch<IProject[]>('get/project-list');
