import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"

let lastId = 0

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // actions => action handlers
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      })
    },
    // bugResolvedd:....
  },
})

const actions = slice.actions
export default slice.reducer
