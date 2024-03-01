import { createSlice } from "@reduxjs/toolkit"

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
    gptIsLoading: false,
  },
  reducers: {
    toggleGptSearchState: (state, action) => {
      state.showGptSearch = !state.showGptSearch
    },

    toggleGptIsLoading: (state, action) => {
      state.gptIsLoading = !state.gptIsLoading
    },

    addGptMovieListToStore: (state, action) => {
      const { movieNames, movieResults } = action.payload
      state.movieNames = movieNames
      state.movieResults = movieResults
    },
  },
})

export const {
  toggleGptSearchState,
  addGptMovieListToStore,
  toggleGptIsLoading,
} = gptSlice.actions
export default gptSlice.reducer
