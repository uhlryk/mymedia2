import { IProject } from '../../../shared/IProject';
import { AppActionType, AppAction, ResourceSubPage, RouteAction, Page } from './useAppStore';

export const clearProject = (): AppAction => ({
  type: AppActionType.CLEAR_PROJECT,
});

export const createProject = (): AppAction => ({
  type: AppActionType.CREATE_PROJECT,
});

export const setProject = (project: IProject): AppAction => ({
  type: AppActionType.SET_PROJECT,
  payload: {
    project,
  },
});

export const routeAction = (
  page: Page,
  subPage: ResourceSubPage
): RouteAction => ({
  type: AppActionType.NAVIGATE_PAGE,
  payload: {
    page,
    subPage
  },
});

export const resourceRouteAction = (
  subPage: ResourceSubPage
): RouteAction => routeAction(Page.RESOURCE_PAGE, subPage);
