import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { IProjectListElement } from '../../main/IProjectList';
import { RootState } from './store';

export interface ProjectState {
    currentProject: IProjectListElement | null
}

const initialState: ProjectState = {
    currentProject: null
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<IProjectListElement>) => {
            state.currentProject = action.payload;
        }
    }
})


export const { setProject } = projectSlice.actions

export const currentProject = (state: RootState): IProjectListElement => state.project.currentProject

export default projectSlice.reducer;