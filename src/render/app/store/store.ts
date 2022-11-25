import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './projectsSlice';

export const store = configureStore({
    reducer: {
        projects: projectsSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch