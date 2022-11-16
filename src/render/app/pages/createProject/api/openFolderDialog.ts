import fetch from '../../../../utils/fetch';
import { OPEN_FOLDER_DIALOG_CHANNEL } from '../../../../../shared/IPCChannels';

export const openFolderDialog = async (): Promise<string | null> =>
  fetch<string | null>(OPEN_FOLDER_DIALOG_CHANNEL);
