import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IResource } from '../../../../../shared/IResource'
import { ITag } from '../../../../../shared/ITag'
import { RootState } from '../../../store/store';
import { IProjectDetails } from '../../../../../shared/IProjectDetails';
import { ITagGroup } from '../../../../../shared/ITagGroup';

export interface ResourcesState {
    current: IResource | null;
    list: IResource[];
    tagGroups: ITagGroup[];
    isLoaded: boolean,
}

const initialState: ResourcesState = {
    current: null,
    list: [],
    tagGroups: [],
    isLoaded: false,
}

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        setProjectDetails: (state, action: PayloadAction<IProjectDetails>) => {
            state.list = action.payload.resources;
            state.tagGroups = action.payload.tagGroups;
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
            if (action.payload.parentId) {
                state.tagGroups.map(tagGroup => {
                    if (tagGroup.id === action.payload.parentId) {
                        tagGroup.children.unshift(action.payload)
                    }
                    return tagGroup;
                });
            } else {
                state.tagGroups.unshift({ ...action.payload, children: [] });
            }
        },
    },
})

export const { setProjectDetails, updateResource, setCurrentResource, clearCurrentResource, addNewTag } = resourcesSlice.actions;

export default resourcesSlice.reducer;

export const selectResources = (state: RootState) => state.resources;

export const selectTagGroupsList = createSelector(selectResources, (resources) => resources.tagGroups);
export const selectResouceList = createSelector(selectResources, (resources) => resources.list);
export const selectCurrentResource = createSelector(selectResources, (resources) => resources.current);
export const selectIsProjectDetailsLoaded = createSelector(selectResources, (projects) => projects.isLoaded);