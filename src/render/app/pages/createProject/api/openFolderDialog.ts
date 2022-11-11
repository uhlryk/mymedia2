import fetch from '../../../../utils/fetch';

export const openFolderDialog = async (): Promise<string | null> =>
  fetch<string | null>('open-folder-dialog');
