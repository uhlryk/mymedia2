import { IProject } from '../../../shared/IProject';
import { AppActionType, AppAction } from './useAppStore';

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
