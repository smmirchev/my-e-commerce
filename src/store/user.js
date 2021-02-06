import { createSlice } from "@reduxjs/toolkit"
import store from "./configureStore"

const userSlice = createSlice({
  name: "user",
  initialState: 0,
  reducers: {
    login: (state, action) => {
      const { payload } = action
      return payload
    },
  },
})

// Reducers
export default userSlice.reducer

// Actions
const { login } = userSlice.actions

// Thunks
export const loginUser = user => dispatch => {
  dispatch(login(user))
}

// let lastId = 0
// const slice = createSlice({
//   name: "bugs",
//   initialState: [],
//   reducers: {
//     // actions => action handlers
//     bugAdded: (state, action) => {
//       state.push({
//         id: ++lastId,
//         description: action.payload,
//         resolved: false,
//       })
//     },
//     bugResolved: (state, action) => {
//       const index = state.findIndex(bug => action.payload === bug.id)
//       state[index].resolved = true
//     },
//   },
// })

// // Reducers
// export default slice.reducer

// // Selectors

// // Actions
// const { bugAdded, bugResolved } = slice.actions

// // Thunks
// export const addBug = description => dispatch => {
//   dispatch(bugAdded(description))
// }

// export const resolveBug = id => dispatch => {
//   dispatch(bugResolved(id))
// }
