import fetch from '../../../../../../utils/fetch';
import { ITagParent } from '../../../../../../../shared/ITagParent';
import { ADD_NEW_TAG_PARENT_CHANNEL } from '../../../../../../../shared/IPCChannels';

export const addNewTagParent = async (
  projectId: string,
  tagName: string
): Promise<ITagParent> =>
  fetch<ITagParent>(ADD_NEW_TAG_PARENT_CHANNEL, {
    projectId,
    tagName
  });
