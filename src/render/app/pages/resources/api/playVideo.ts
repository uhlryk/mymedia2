import fetch from '../../../../utils/fetch';
import { PLAY_VIDEO_CHANNEL } from '../../../../../shared/IPCChannels';

export const playVideo = async (
  projectFolderPath: string,
  resourceId: string
): Promise<boolean | null> =>
  fetch<boolean | null>(PLAY_VIDEO_CHANNEL, {
    projectPath: projectFolderPath,
    resourceId,
  });
