import { Dispatch, useReducer } from "react";
import { IResource } from '../../../../../shared/IResource';

export enum ResourceActionType {
    SET_RESOURCES,
    UPDATE_RESOURCE
}

export type SetResourcesAction = {
    type: ResourceActionType.SET_RESOURCES,
    payload: {
        resources: IResource[]
    }
}

export type UpdateResourceAction = {
    type: ResourceActionType.UPDATE_RESOURCE,
    payload: {
        resource: IResource
    }
}

export type ResourceAction = SetResourcesAction | UpdateResourceAction;

type ResourceState = {
    resources: IResource[],
    isLoaded: boolean
}

const initialState: ResourceState = {
    resources: [],
    isLoaded: false,
}

export type ResourceStore = [
    resourcesState: ResourceState,
    dispatchResourcesState: Dispatch<ResourceAction>
]

export const useResourcesStore = (): ResourceStore => {
    const [resourcesState, dispatchResourcesState] = useReducer((state: ResourceState, action: ResourceAction): ResourceState => {
        switch (action.type) {
            case ResourceActionType.SET_RESOURCES: {
                return {
                    isLoaded: true,
                    resources: action.payload.resources
                }
            }
            case ResourceActionType.UPDATE_RESOURCE: {
                return {
                    ...state,
                    resources: state.resources.map(resource => resource.id === action.payload.resource.id ? action.payload.resource : resource)

                }
            }
            default:
                return state;
        }
    }, initialState);

    return [resourcesState, dispatchResourcesState];
}