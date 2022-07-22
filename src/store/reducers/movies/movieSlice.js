import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new movie
export const createMovie = createAsyncThunk(
  'movies/create',
  async (movieData, thunkAPI) => {
    console.log(movieData)
    try {
     
      return await movieService.createMovie(movieData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user movies
export const getMovies = createAsyncThunk(
  'movies/getAll',
  async (_, thunkAPI) => {
    try {
    
      return await movieService.getMovies()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user movie
export const deleteMovie = createAsyncThunk(
  'movies/delete',
  async (id, thunkAPI) => {
    try {
    
      return await movieService.deleteMovie(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies.push(action.payload)
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = action.payload
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload
        )
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer
