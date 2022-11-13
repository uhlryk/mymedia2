import { Dispatch, useReducer } from 'react';
import { IResource } from '../../../../../shared/IResource';

export enum ResourceActionType {
  SET_RESOURCES,
  UPDATE_RESOURCE,
  SHOW_RESOURCE_DETAILS,
  HIDE_RESOURCE_DETAILS
}

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

export type ResourceAction = SetResourcesAction | UpdateResourceAction | ShowResourceDetailsAction | HideResourceDetailsAction;

type ResourceState = {
  resources: IResource[];
  isLoaded: boolean;
  selectedResourceId: string | null;
};

const initialState: ResourceState = {
  resources: [],
  isLoaded: false,
  selectedResourceId: null
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
        default:
          return state;
      }
    },
    initialState
  );

  return [resourcesState, dispatchResourcesState];
};
