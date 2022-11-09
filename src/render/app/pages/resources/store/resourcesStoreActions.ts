import { IResource } from '../../../../../shared/IResource';
import {
  ResourceActionType,
  SetResourcesAction,
  UpdateResourceAction,
} from './useResourcesStore';

export const setResources = (resources: IResource[]): SetResourcesAction => ({
  type: ResourceActionType.SET_RESOURCES,
  payload: {
    resources,
  },
});

export const updateResource = (resource: IResource): UpdateResourceAction => ({
  type: ResourceActionType.UPDATE_RESOURCE,
  payload: {
    resource,
  },
});
