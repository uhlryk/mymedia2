import fetch from '../../../../utils/fetch';

export const playVideo = async (
  projectFolderPath: string,
  resourceId: string
): Promise<boolean | null> =>
  fetch<boolean | null>('play-video', {
    projectPath: projectFolderPath,
    resourceId,
  });
