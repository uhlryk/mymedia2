import { Dispatch, useReducer } from 'react';
import { IProject } from '../../../shared/IProject';

export enum Page {
  RESOURCE_PAGE = 'RESOURCE_PAGE',
  PROJECT_PAGE = 'PROJECT_PAGE',
  CREATE_PROJECT_PAGE = 'CREATE_PROJECT_PAGE',
}

export enum ResourceSubPage {
  RESOURCE_LIST_PAGE = 'RESOURCE_LIST_PAGE',
  TAGS_LIST_PAGE = 'TAGS_LIST_PAGE',
  PLAY_LIST_PAGE = 'PLAY_LIST_PAGE',
}

export enum AppActionType {
  CLEAR_PROJECT,
  SET_PROJECT,
  CREATE_PROJECT,
  NAVIGATE_PAGE
}

type AppState = {
  page: Page;
  subPage: ResourceSubPage | null;
  project: IProject | null;
};

export type AppAction = {
  type: AppActionType.CLEAR_PROJECT | AppActionType.SET_PROJECT | AppActionType.CREATE_PROJECT;
  payload?: {
    project?: IProject;
  };
};

export type RouteAction = {
  type: AppActionType.NAVIGATE_PAGE;
  payload: {
    page: Page;
    subPage?: ResourceSubPage;
  };
};

const initialState: AppState = {
  page: Page.PROJECT_PAGE,
  subPage: null,
  project: null,
};

export type AppStore = [
  appState: AppState,
  dispatchAppState: Dispatch<AppAction | RouteAction>
];

export const useAppStore = (): AppStore => {
  const [appState, dispatchAppState] = useReducer(
    (state: AppState, action: AppAction | RouteAction): AppState => {
      switch (action.type) {
        case AppActionType.SET_PROJECT:
          return {
            project: action.payload.project,
            page: Page.RESOURCE_PAGE,
            subPage: ResourceSubPage.RESOURCE_LIST_PAGE
          };
        case AppActionType.CLEAR_PROJECT:
          return {
            project: null,
            page: Page.PROJECT_PAGE,
            subPage: null
          };
        case AppActionType.CREATE_PROJECT:
          return {
            project: null,
            page: Page.CREATE_PROJECT_PAGE,
            subPage: null
          };
        case AppActionType.NAVIGATE_PAGE: {
          action;
          return {
            ...state,
            page: action.payload.page,
            subPage: action.payload.subPage,
          };
        }
        default:
          return state;
      }
    },
    initialState
  );

  return [appState, dispatchAppState];
};
