import { IProject } from "../../../shared/IProject";
import { ActionType, AppAction } from "./store";

export const clearProject = (): AppAction => ({
  type: ActionType.CLEAR_PROJECT
});

export const createProject = (): AppAction => ({
  type: ActionType.CREATE_PROJECT
});

export const setProject = (project: IProject): AppAction => ({
  type: ActionType.SET_PROJECT,
  payload: {
    project
  }
});
