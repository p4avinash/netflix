import { createSlice } from "@reduxjs/toolkit"

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
  },
  reducers: {
    toggleGptSearchState: (state, action) => {
      state.showGptSearch = !state.showGptSearch
    },
  },
})

export const { toggleGptSearchState } = gptSlice.actions
export default gptSlice.reducer
