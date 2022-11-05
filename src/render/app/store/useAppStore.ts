import { Dispatch, useReducer } from 'react';
import { IProject } from '../../../shared/IProject';

export enum Page {
  RESOURCE_PAGE,
  PROJECT_PAGE,
  CREATE_PROJECT_PAGE,
}

export enum AppActionType {
  CLEAR_PROJECT,
  SET_PROJECT,
  CREATE_PROJECT,
}

type AppState = {
  page: Page;
  project: IProject | null;
}

export type AppAction = {
  type: AppActionType;
  payload?: {
    project?: IProject;
  };
}

const initialState: AppState = {
  page: Page.PROJECT_PAGE,
  project: null,
};

export type AppStore = {
  appState: AppState;
  dispatchAppState: Dispatch<AppAction>;
};

export const useAppStore = (): AppStore => {
  const [appState, dispatchAppState] = useReducer(
    (state: AppState, action: AppAction): AppState => {
      switch (action.type) {
        case AppActionType.SET_PROJECT:
          return {
            project: action.payload.project,
            page: Page.RESOURCE_PAGE,
          };
        case AppActionType.CLEAR_PROJECT:
          return {
            project: null,
            page: Page.PROJECT_PAGE,
          };
        case AppActionType.CREATE_PROJECT:
          return {
            project: null,
            page: Page.CREATE_PROJECT_PAGE,
          };
        default:
          return state;
      }
    },
    initialState
  );

  return { appState, dispatchAppState };
}


