import fetch from '../../../../../../utils/fetch';
import { ITag } from '../../../../../../../shared/ITag';
import { ADD_NEW_TAG_CHANNEL } from '../../../../../../../shared/IPCChannels';

export const addNewTag = async (
  projectId: string,
  tagName: string,
  parentTagId: string
): Promise<ITag> =>
  fetch<ITag>(ADD_NEW_TAG_CHANNEL, {
    projectId,
    tagName,
    parentTagId,
  });
