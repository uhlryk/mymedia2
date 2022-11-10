import fetch from '../../../../utils/fetch';
import { IProject } from '../../../../../shared/IProject';

export const openFolderDialog = async (): Promise<string | null> => fetch<string | null>('open-folder-dialog');
