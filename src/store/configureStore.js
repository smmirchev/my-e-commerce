import { configureStore } from "@reduxjs/toolkit"
import reducer from "./auth"

const store = () => {
  return configureStore({
    reducer,
  })
}

export default store
