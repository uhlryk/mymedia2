import { SetStateAction, Dispatch, useReducer } from "react";
import { IResource } from '../../../../../shared/IResource';

export enum ResourceActionType {
    SET_RESOURCES,
    UPDATE_RESOURCE
}

type SetResourcesAction = {
    type: ResourceActionType.SET_RESOURCES,
    payload: {
        resources: IResource[]
    }
}

type UpdateResourceAction = {
    type: ResourceActionType.UPDATE_RESOURCE,
    payload: {
        resource: IResource
    }
}

type ResourceAction = SetResourcesAction | UpdateResourceAction;

type ResourceState = {
    resources: IResource[],
    loaded: boolean
}

const initialState: ResourceState = {
    resources: [],
    loaded: false,
}

type ResourceStore = {
    resourceState: ResourceState;
    dispatchResourceState: Dispatch<ResourceAction>
}

export const useResourceStore = (): ResourceStore => {
    const [resourceState, dispatchResourceState] = useReducer((state: ResourceState, action: ResourceAction): ResourceState => {
        switch (action.type) {
            case ResourceActionType.SET_RESOURCES: {
                return {
                    loaded: true,
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

    return { resourceState, dispatchResourceState };
}