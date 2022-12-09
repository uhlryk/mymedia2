import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IResource } from '../../../../../shared/IResource'
import { ITag } from '../../../../../shared/ITag'
import { RootState } from '../../../store/store';
import { IProjectDetails } from '../../../../../shared/IProjectDetails';
import { ITagTree } from '../../../../../shared/ITagTree';
import { ITagParent } from '../../../../../shared/ITagParent';

export interface ResourcesState {
    current: IResource | null;
    list: IResource[];
    tagTree: ITagTree;
    isLoaded: boolean,
}

const initialState: ResourcesState = {
    current: null,
    list: [],
    tagTree: {},
    isLoaded: false,
}

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        setProjectDetails: (state, action: PayloadAction<IProjectDetails>) => {
            state.list = action.payload.resources;
            state.tagTree = action.payload.tagTree;
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
            state.tagTree[action.payload.parentId].children[action.payload.id] = action.payload;
        },
        addNewTagParent: (state, action: PayloadAction<ITagParent>) => {
            state.tagTree[action.payload.id] = action.payload;
        },
        addResourceTag: (state, action: PayloadAction<{ resourceId: string, tagParentId: string, tagId: string }>) => {
            const resource = state.list.find((resource) =>
                resource.id === action.payload.resourceId
            );
            resource.tags.push({
                tagParentId: action.payload.tagParentId,
                tagId: action.payload.tagId,
            })
            state.current.tags.push({
                tagParentId: action.payload.tagParentId,
                tagId: action.payload.tagId,
            })
        }
    },
})

export const { setProjectDetails, updateResource, setCurrentResource, clearCurrentResource, addNewTag, addNewTagParent, addResourceTag } = resourcesSlice.actions;

export default resourcesSlice.reducer;

export const selectResources = (state: RootState) => state.resources;

export const selectTagTree = createSelector(selectResources, (resources) => resources.tagTree);
export const selectResouceList = createSelector(selectResources, (resources) => resources.list);
export const selectCurrentResource = createSelector(selectResources, (resources) => resources.current);
export const selectIsProjectDetailsLoaded = createSelector(selectResources, (projects) => projects.isLoaded);