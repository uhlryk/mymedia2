import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { IProject } from '../../shared/IProject';
import { RootState } from './store';

export interface ProjectState {
    currentProject: IProject | null
}

const initialState: ProjectState = {
    currentProject: null
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<IProject>) => {
            state.currentProject = action.payload;
        }
    }
})


export const { setProject } = projectSlice.actions

export const currentProject = (state: RootState): IProject => state.project.currentProject

export default projectSlice.reducer;