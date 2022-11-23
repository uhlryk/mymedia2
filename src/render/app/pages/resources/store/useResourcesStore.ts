import { Dispatch, useReducer } from 'react';
import { IResource } from '../../../../../shared/IResource';

export enum Page {
  RESOURCE_LIST_PAGE,
  TAGS_LIST_PAGE,
  PLAYLIST_PAGE,
}

export enum ResourceActionType {
  SET_RESOURCES,
  UPDATE_RESOURCE,
  SHOW_RESOURCE_DETAILS,
  HIDE_RESOURCE_DETAILS,
  NAVIGATE_PAGE,
}

export type RouteAction = {
  type: ResourceActionType.NAVIGATE_PAGE;
  payload: {
    page: Page.PLAYLIST_PAGE | Page.RESOURCE_LIST_PAGE | Page.TAGS_LIST_PAGE;
  };
};

export type SetResourcesAction = {
  type: ResourceActionType.SET_RESOURCES;
  payload: {
    resources: IResource[];
  };
};

export type UpdateResourceAction = {
  type: ResourceActionType.UPDATE_RESOURCE;
  payload: {
    resource: IResource;
  };
};

export type ShowResourceDetailsAction = {
  type: ResourceActionType.SHOW_RESOURCE_DETAILS;
  payload: {
    resourceId: string;
  };
};

export type HideResourceDetailsAction = {
  type: ResourceActionType.HIDE_RESOURCE_DETAILS;
};

export type ResourceAction =
  | SetResourcesAction
  | UpdateResourceAction
  | ShowResourceDetailsAction
  | HideResourceDetailsAction
  | RouteAction;

type ResourceState = {
  page: Page;
  resources: IResource[];
  isLoaded: boolean;
  selectedResourceId: string | null;
};

const initialState: ResourceState = {
  page: Page.RESOURCE_LIST_PAGE,
  resources: [],
  isLoaded: false,
  selectedResourceId: null,
};

export type ResourceStore = [
  resourcesState: ResourceState,
  dispatchResourcesState: Dispatch<ResourceAction>
];

export const useResourcesStore = (): ResourceStore => {
  const [resourcesState, dispatchResourcesState] = useReducer(
    (state: ResourceState, action: ResourceAction): ResourceState => {
      switch (action.type) {
        case ResourceActionType.SET_RESOURCES: {
          return {
            ...state,
            isLoaded: true,
            resources: action.payload.resources,
          };
        }
        case ResourceActionType.UPDATE_RESOURCE: {
          return {
            ...state,
            resources: state.resources.map((resource) =>
              resource.id === action.payload.resource.id
                ? action.payload.resource
                : resource
            ),
          };
        }
        case ResourceActionType.SHOW_RESOURCE_DETAILS: {
          return {
            ...state,
            selectedResourceId: action.payload.resourceId,
          };
        }
        case ResourceActionType.HIDE_RESOURCE_DETAILS: {
          return {
            ...state,
            selectedResourceId: null,
          };
        }
        case ResourceActionType.NAVIGATE_PAGE: {
          return {
            ...state,
            page: action.payload.page,
          };
        }
        default:
          return state;
      }
    },
    initialState
  );

  return [resourcesState, dispatchResourcesState];
};
