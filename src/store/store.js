import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth/authSlice'
import moviesReducer from './reducers/movies/movieSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
})
