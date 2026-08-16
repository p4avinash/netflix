import { createSlice } from "@reduxjs/toolkit"

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movieTrailer: null,
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trailerModalMovie: null,
  },
  reducers: {
    openTrailerModal: (state, action) => {
      state.trailerModalMovie = action.payload
    },

    closeTrailerModal: (state) => {
      state.trailerModalMovie = null
    },

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

    addPopularMoviesToStore: (state, action) => {
      state.popularMovies = action.payload
    },

    removePopularMoviesFromStore: (state, action) => {
      state.popularMovies = null
    },

    addTopRatedMoviesToStore: (state, action) => {
      state.topRatedMovies = action.payload
    },

    removeTopRatedMovesFromStore: (state, action) => {
      state.topRatedMovies = null
    },

    addUpcomingMoviesToStore: (state, action) => {
      state.upcomingMovies = action.payload
    },

    removeUpcomingMovesFromStore: (state, action) => {
      state.upcomingMovies = null
    },
  },
})

export const {
  openTrailerModal,
  closeTrailerModal,
  addNowPlayingMoviesToStore,
  setMovieTrailerToStore,
  addPopularMoviesToStore,
  addTopRatedMoviesToStore,
  addUpcomingMoviesToStore,
  removeNowPlayingMoviesFromStore,
  removeMovieTrailerFromStore,
  removePopularMoviesFromStore,
  removeTopRatedMovesFromStore,
  removeUpcomingMovesFromStore,
} = moviesSlice.actions
export default moviesSlice.reducer
