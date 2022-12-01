import fetch from '../../../../../../utils/fetch';
import { ITag } from '../../../../../../../shared/ITag';
import { ADD_NEW_TAG_CHANNEL } from '../../../../../../../shared/IPCChannels';

export const addNewTag = async (
  projectPath: string,
  tagName: string,
  parentTagId?: string
): Promise<ITag> =>
  fetch<ITag>(ADD_NEW_TAG_CHANNEL, {
    projectPath,
    tagName,
    parentTagId,
  });
