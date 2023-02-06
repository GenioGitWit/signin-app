import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../module/Authentication/AuthSlice'

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch