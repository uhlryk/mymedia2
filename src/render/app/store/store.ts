import React, { Dispatch, useReducer, FC } from "react";
import { IProject } from "../../../shared/IProject";

export enum Page {
    RESOURCE_PAGE,
    PROJECT_PAGE,
    CREATE_PROJECT_PAGE
}

export enum ActionType {
    CLEAR_PROJECT,
    SET_PROJECT,
    CREATE_PROJECT,
}
interface AppState {
    page: Page;
    project: IProject | null
}

interface AppAction {
    type: ActionType;
    payload?: {
        project?: IProject
    }
}

const initialState: AppState = {
    page: Page.PROJECT_PAGE,
    project: null
}

export type AppContextType = {
    appState: AppState, appDispatch: Dispatch<AppAction>
}

export function useAppReducer(): AppContextType {
    const [appState, appDispatch] = useReducer((state: AppState, action: AppAction) => {
        switch (action.type) {
            case ActionType.SET_PROJECT:
                return {
                    project: action.payload.project,
                    page: Page.RESOURCE_PAGE
                }
            case ActionType.CLEAR_PROJECT:
                return {
                    project: null,
                    page: Page.PROJECT_PAGE
                }
            case ActionType.CREATE_PROJECT:
                return {
                    project: null,
                    page: Page.CREATE_PROJECT_PAGE
                }
            default:
                return state;
        }
    }, initialState);

    return { appState, appDispatch };
}

export const AppContext = React.createContext<AppContextType | null>(null);


