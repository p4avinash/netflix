import { createSlice } from "@reduxjs/toolkit"

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    movieTrailer: null,
  },
  reducers: {
    addNowPlayingMoviesToStore: (state, action) => {
      state.nowPlayingMovies = action.payload
    },

    removeNowPlayingMoviesFromStore: (state, action) => {
      state.nowPlayingMovies = null
    },

    setMovieTrailerToStore: (state, action) => {
      state.movieTrailer = action.payload
    },

    removeMovieTrailerFromStore: (state, action) => {
      state.movieTrailer = null
    },
  },
})

export const {
  addNowPlayingMoviesToStore,
  setMovieTrailerToStore,
  removeNowPlayingMoviesFromStore,
  removeMovieTrailerFromStore,
} = moviesSlice.actions
export default moviesSlice.reducer
