import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setLoggedInUserData: (state, action) => {
      return action.payload
    },

    removeLoggedInUserData: () => {
      return null
    },
  },
})

export const { setLoggedInUserData, removeLoggedInUserData } = userSlice.actions
export default userSlice.reducer
