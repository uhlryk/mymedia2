import { IResource } from '../../../../../shared/IResource';
import {
  ResourceActionType,
  SetResourcesAction,
  UpdateResourceAction,
  ShowResourceDetailsAction,
  HideResourceDetailsAction,
  ResourceAction,
  Page,
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

export const showResourceDetails = (
  resourceId: string
): ShowResourceDetailsAction => ({
  type: ResourceActionType.SHOW_RESOURCE_DETAILS,
  payload: {
    resourceId,
  },
});

export const hideResourceDetails = (): HideResourceDetailsAction => ({
  type: ResourceActionType.HIDE_RESOURCE_DETAILS,
});

export const routeAction = (
  page: Page
): ResourceAction => ({
  type: ResourceActionType.NAVIGATE_PAGE,
  payload: {
    page,
  },
});