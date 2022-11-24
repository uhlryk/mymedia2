import { Dispatch, useReducer } from 'react';
import { IProject } from '../../../shared/IProject';

export enum AppActionType {
  CLEAR_PROJECT,
  SET_PROJECT,
  CREATE_PROJECT
}

type AppState = {
  project: IProject | null;
};

export type AppAction = {
  type: AppActionType;
  payload?: {
    project?: IProject;
  };
};

const initialState: AppState = {
  project: null,
};

export type AppStore = [
  appState: AppState,
  dispatchAppState: Dispatch<AppAction>
];

export const useAppStore = (): AppStore => {
  const [appState, dispatchAppState] = useReducer(
    (state: AppState, action: AppAction): AppState => {
      switch (action.type) {
        case AppActionType.SET_PROJECT:
          return {
            project: action.payload.project,
          };
        case AppActionType.CLEAR_PROJECT:
          return {
            project: null,
          };
        case AppActionType.CREATE_PROJECT:
          return {
            project: null,
          };
        default:
          return state;
      }
    },
    initialState
  );

  return [appState, dispatchAppState];
};
