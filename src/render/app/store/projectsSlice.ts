import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProject } from '../../../shared/IProject'

export interface ProjectsState {
    current: IProject | null;
    list: IProject[];
}

const initialState: ProjectsState = {
    current: null,
    list: [],
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.list = action.payload;
        },
        setCurrentProject: (state, action: PayloadAction<IProject>) => {
            state.current = action.payload;
        },
        setNewCurrentProject: (state, action: PayloadAction<IProject>) => {
            state.current = action.payload;
            state.list.push(action.payload);
        },
        clearCurrentProject: (state) => {
            state.current = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setProjects, setCurrentProject, setNewCurrentProject, clearCurrentProject } = projectsSlice.actions

export default projectsSlice.reducer