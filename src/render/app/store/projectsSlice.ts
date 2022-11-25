import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProject } from '../../../shared/IProject'
import { RootState } from './store';

export interface ProjectsState {
    current: IProject | null;
    list: IProject[];
    isLoaded: boolean;
}

const initialState: ProjectsState = {
    current: null,
    list: [],
    isLoaded: false,
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.list = action.payload;
            state.isLoaded = true;
        },
        setCurrentProject: (state, action: PayloadAction<IProject>) => {
            state.current = action.payload;
        },
        addNewProject: (state, action: PayloadAction<IProject>) => {
            state.list.push(action.payload);
        },
        clearCurrentProject: (state) => {
            state.current = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setProjects, setCurrentProject, addNewProject, clearCurrentProject } = projectsSlice.actions;

export default projectsSlice.reducer;

export const selectProjects = (state: RootState) => state.projects;

export const selectProjectList = createSelector(selectProjects, (projects) => projects.list);
export const selectCurrentProject = createSelector(selectProjects, (projects) => projects.current);
export const selectIsProjectsLoaded = createSelector(selectProjects, (projects) => projects.isLoaded);
