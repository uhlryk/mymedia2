import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IResource } from '../../../../../shared/IResource'
import { ITag } from '../../../../../shared/ITag'
import { RootState } from '../../../store/store';

export interface ResourcesState {
    current: IResource | null;
    list: IResource[];
    tags: ITag[];
    isLoaded: boolean,
}

const initialState: ResourcesState = {
    current: null,
    list: [],
    tags: [],
    isLoaded: false,
}

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        setResources: (state, action: PayloadAction<IResource[]>) => {
            state.list = action.payload;
            state.isLoaded = true;
        },
        updateResource: (state, action: PayloadAction<IResource>) => {
            state.list = state.list.map((resource) =>
                resource.id === action.payload.id
                    ? action.payload
                    : resource
            );
        },
        setCurrentResource: (state, action: PayloadAction<IResource>) => {
            state.current = action.payload;
        },
        clearCurrentResource: (state) => {
            state.current = null;
        },
        addNewTag: (state, action: PayloadAction<ITag>) => {
            state.tags.unshift(action.payload);
        },
    },
})

export const { setResources, updateResource, setCurrentResource, clearCurrentResource, addNewTag } = resourcesSlice.actions;

export default resourcesSlice.reducer;

export const selectResources = (state: RootState) => state.resources;

export const selectResouceList = createSelector(selectResources, (resources) => resources.list);
export const selectCurrentResource = createSelector(selectResources, (resources) => resources.current);
export const selectIsResourcesLoaded = createSelector(selectResources, (projects) => projects.isLoaded);